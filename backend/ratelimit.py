import time
from collections import defaultdict
from config import config


class RateLimiter:
    def __init__(self):
        self.requests = defaultdict(list)

    def check(self, ip: str) -> tuple[bool, int]:
        now = time.time()
        window = 60
        max_reqs = config.get("rate_limit_per_minute", 15)
        self.requests[ip] = [t for t in self.requests[ip] if now - t < window]
        if len(self.requests[ip]) >= max_reqs:
            wait = int(window - (now - self.requests[ip][0]))
            return False, wait
        self.requests[ip].append(now)
        return True, 0


rate_limiter = RateLimiter()
