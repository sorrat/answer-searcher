import threading

import cachetools


LOCK = threading.RLock()
CACHE = cachetools.TTLCache(maxsize=30, ttl=300)


def ttl_cache(func):
    return cachetools.cached(CACHE, lock=LOCK)(func)
