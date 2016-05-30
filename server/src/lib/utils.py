# -*- coding: utf-8 -*-
import requests

from .cache import ttl_cache


@ttl_cache
def fetch(url):
    return requests.get(url).text


def to_list(fn):
    def wrapped(*args):
        return list(fn(*args))
    return wrapped
