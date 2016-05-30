# -*- coding: utf-8 -*-
import json
import html
from urllib.parse import urlencode

from .utils import fetch, to_list


def build_search_url(question, site):
    query = {
        'order': 'desc',
        'sort': 'relevance',
        'title': question,
        'site': site,
    }
    url = "http://api.stackexchange.com/2.2/similar?%s" % urlencode(query)
    return url


def represent_question(question):
    return {
        'title': html.unescape(question['title']),
        'owner': html.unescape(question['owner']['display_name']),
        'date': question['creation_date'],
        'link': question['link'],
        'is_answered': question['is_answered'],
    }


# def fetch(*args):
#     import settings
#     return settings.SERVER_DIR.joinpath('stack_exchange_similar.json').read_text()


@to_list
def search_similar(question, site):
    url = build_search_url(question, site)
    content = fetch(url)
    parsed = json.loads(content)
    for question in parsed['items']:
        yield represent_question(question)
