from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "RPA OpenAPI"
    API_VERSION: str = "1.0"
    DATABASE_URL: str
    DATABASE_USERNAME: str
    DATABASE_PASSWORD: str
    REDIS_URL: str

    # InsForge API URL — 远程 token 验证
    INSFORGE_API_URL: str = "http://172.16.100.211:7130"
    # Token 验证模式: "remote" (推荐) 或 "local" (降级)
    AUTH_VERIFY_MODE: str = "remote"
    # JWT 配置（本地验证降级方案）
    JWT_SECRET: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"

    LOG_LEVEL: str = "INFO"
    LOG_DIR: str = "/var/log/rpa-openapi"

    model_config = SettingsConfigDict(
        env_file=None,
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
