import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_FILE = BASE_DIR / "config.json"
DOWNLOADS_DIR = BASE_DIR / "downloads"

DEFAULT_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "max_file_age_minutes": 30,
    "rate_limit_per_minute": 15,
    "log_level": "info",
    "max_concurrent_downloads": 3,
}


def load_config():
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            return {**DEFAULT_CONFIG, **json.load(f)}
    return dict(DEFAULT_CONFIG)


config = load_config()
