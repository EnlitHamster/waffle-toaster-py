from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'sqlite:////tmp/wt.db'

db = SQLAlchemy(app)


class User(db.Model):
    username = db.Column(db.String(25), primary_key=True)
    password = db.Column(db.String(25), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username


class Board(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    canvas_width = db.Column(db.Integer, nullable=False)
    canvas_height = db.Column(db.Integer, nullable=False)
    bg_type = db.Column(db.Integer, nullable=False)
    bg_cell_size = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<name %r, %rx%r>' \
                % self.name \
                % self.canvas_width \
                % self.canvas_height


@app.route('/')
def index():
    return render_template('index.html')


# @app.route('/store/create')
# def create_main_board():
#    print("hallo")


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
