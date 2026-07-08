from collections.abc import Callable
from dataclasses import dataclass
from typing import Annotated, Any

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.config import get_settings

settings = get_settings()
security_scheme = HTTPBearer()


@dataclass
class UserContext:
    user_id: str
    email: str
    role: str
    tenant_id: str | None = None


async def _verify_token_remote(token: str) -> UserContext:
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(
                f"{settings.INSFORGE_API_URL}/api/auth/sessions/current",
                headers={"Authorization": f"Bearer {token}"},
            )
            if response.status_code == 401:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
            if response.status_code != 200:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Token verification failed: {response.status_code}")
            data = response.json()
            user = data.get("user", {})
            if not user or not user.get("id"):
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
            return UserContext(
                user_id=str(user["id"]),
                email=user.get("email", ""),
                role=user.get("role", "authenticated"),
                tenant_id=user.get("tenant_id"),
            )
        except httpx.RequestError as e:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"InsForge auth service unreachable: {e}")


async def _verify_token_local(token: str) -> UserContext:
    try:
        payload: dict[str, Any] = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id: str | None = payload.get("sub") or payload.get("user_id")
        email: str | None = payload.get("email")
        role: str | None = payload.get("role")
        tenant_id: str | None = payload.get("tenant_id")
        if user_id is None or email is None or role is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
        return UserContext(user_id=str(user_id), email=email, role=role, tenant_id=tenant_id)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")


async def get_current_user(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security_scheme)]) -> UserContext:
    token = credentials.credentials
    if settings.AUTH_VERIFY_MODE == "remote":
        try:
            return await _verify_token_remote(token)
        except HTTPException as e:
            if e.status_code == 502:
                return await _verify_token_local(token)
            raise
    return await _verify_token_local(token)


def require_role(required_role: str) -> Callable[[UserContext], UserContext]:
    async def role_checker(current_user: Annotated[UserContext, Depends(get_current_user)]) -> UserContext:
        if current_user.role != required_role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Role '{required_role}' required")
        return current_user
    return role_checker


async def get_tenant_context(current_user: Annotated[UserContext, Depends(get_current_user)]) -> str | None:
    return current_user.tenant_id