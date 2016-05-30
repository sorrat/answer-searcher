from pathlib import Path

ROOT_DIR = Path(__file__).joinpath('../../../').resolve()
SERVER_DIR = ROOT_DIR.joinpath('server')
CLIENT_DIR = ROOT_DIR.joinpath('client')
STATIC_DIR = str(CLIENT_DIR.joinpath('build'))

import sys
sys.path.insert(0, str(SERVER_DIR.joinpath('src')))
