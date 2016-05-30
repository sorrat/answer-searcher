# -*- coding: utf-8 -*-
from functools import partial

from bottle import Bottle, run, static_file

from settings import STATIC_DIR  # also injects current dir to sys.path
from controllers import search_similar


def index():
    return serve_static('index.html')

def serve_static(filepath):
    return static_file(filepath, root=STATIC_DIR)


app = Bottle()

# API
app.route('/similar', 'GET', search_similar)

# STATIC
app.route('/', 'GET', partial(serve_static, 'index.html'))
app.route('/static/<filepath:path>', 'GET', serve_static)


if __name__ == '__main__':
    run(app, host='localhost', port=8020, reloader=True, debug=True)
