import os

from flask import Flask, g

from flask_mongoengine import MongoEngine

def create_app(test_config=None):
    # create and cofigure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGODB_SETTINGS={
            'db': 'waffletoaster',
            'host': 'localhost',
            'port': 27017
        },
    )

    db = MongoEngine(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/say-hello')
    def say_hello():
        return 'Hello, World!'

    # initializing components
    from . import auth
    from . import webapp
    from . import api

    app.register_blueprint(auth.bp)
    app.register_blueprint(webapp.bp)
    app.register_blueprint(api.bp)

    app.add_url_rule('/', endpoint='index')

    return app
