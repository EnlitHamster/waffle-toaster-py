from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from waffletoaster.auth import login_required

bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/create/board', methods=('GET', 'POST'))
@login_required
def create_board():
    data = request.json['data']

    name = data['root']['name']
    size = data['root']['size']
    background_type = data['root']['bg']['type']
    background_linespace = data['root']['bg']['cellsize']

    print(data)