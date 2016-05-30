# -*- coding: utf-8 -*-
import json

from bottle import request

from lib import stack_exchange


def search_similar():
    questions = stack_exchange.search_similar(
        request.query.question,
        request.query.site)
    return json.dumps(questions)
