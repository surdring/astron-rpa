import os
import re
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md

SITEMAP_URL = "https://docs.insforge.dev/sitemap.xml"
OUTPUT_DIR = Path(__file__).parent / "insforge-docs"
MAX_WORKERS = 8
REQUEST_TIMEOUT = 30


def fetch_url(url: str) -> str | None:
    try:
        resp = requests.get(url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        # Use ascii-safe logging to avoid Windows console encoding issues
        safe_url = url.encode("ascii", "replace").decode("ascii")
        safe_err = str(e).encode("ascii", "replace").decode("ascii")
        print(f"[ERROR] Failed to fetch {safe_url}: {safe_err}")
        return None


def url_to_path(url: str) -> Path:
    parsed = urlparse(url)
    path_parts = parsed.path.strip("/").split("/")
    if not path_parts or path_parts == [""]:
        path_parts = ["index"]

    # Last part is the file name; everything before becomes directories.
    if len(path_parts) == 1:
        rel_path = Path(path_parts[0] + ".md")
    else:
        rel_path = Path(*path_parts[:-1]) / (path_parts[-1] + ".md")
    return OUTPUT_DIR / rel_path


def clean_markdown(text: str) -> str:
    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def process_page(url: str) -> tuple[str, bool, str]:
    out_path = url_to_path(url)
    if out_path.exists():
        return url, True, str(out_path.relative_to(OUTPUT_DIR)) + " (exists)"

    html = fetch_url(url)
    if html is None:
        return url, False, ""

    soup = BeautifulSoup(html, "html.parser")

    # Try to find the main article/content element first
    main = soup.find("main") or soup.find("article") or soup.find("div", role="main")
    if main:
        content_html = str(main)
    else:
        # Fallback: remove nav/footer/script/style and convert body
        for tag in soup.find_all(["nav", "footer", "script", "style", "header"]):
            tag.decompose()
        body = soup.find("body") or soup
        content_html = str(body)

    markdown = clean_markdown(md(content_html, heading_style="ATX"))

    out_path = url_to_path(url)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(markdown, encoding="utf-8")

    return url, True, str(out_path.relative_to(OUTPUT_DIR))


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Downloading sitemap from {SITEMAP_URL}...")
    sitemap_xml = fetch_url(SITEMAP_URL)
    if not sitemap_xml:
        raise RuntimeError("Could not fetch sitemap.")

    root = ET.fromstring(sitemap_xml)
    # sitemap uses namespace
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text for loc in root.findall(".//ns:loc", ns)]
    print(f"Found {len(urls)} URLs in sitemap.")

    # Save URL list for reference
    (OUTPUT_DIR / "_url_list.txt").write_text("\n".join(urls), encoding="utf-8")

    successes = 0
    failures = 0
    failed_urls = []

    start = time.time()
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(process_page, url): url for url in urls}
        for future in as_completed(future_to_url):
            url, ok, rel_path = future.result()
            if ok:
                successes += 1
                safe_rel = rel_path.encode("ascii", "replace").decode("ascii")
                print(f"[OK] {successes}/{len(urls)} -> {safe_rel}")
            else:
                failures += 1
                failed_urls.append(url)
                safe_url = url.encode("ascii", "replace").decode("ascii")
                print(f"[FAIL] {safe_url}")

    elapsed = time.time() - start
    summary = (
        f"Download complete in {elapsed:.1f}s\n"
        f"Total URLs: {len(urls)}\n"
        f"Successes: {successes}\n"
        f"Failures: {failures}\n"
    )
    (OUTPUT_DIR / "_download_summary.txt").write_text(
        summary + "\nFailed URLs:\n" + "\n".join(failed_urls),
        encoding="utf-8",
    )
    print(summary)


if __name__ == "__main__":
    main()
