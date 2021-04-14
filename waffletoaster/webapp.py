import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from waffletoaster.auth import login_required

bp = Blueprint('app', __name__)


@bp.route('/')
@login_required
def index():
    return render_template('index.html')
