# Import the required libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask import Flask, render_template, request as httprequest, redirect, url_for
from flasgger import Swagger
import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property
import flask.scaffold
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
from flask_restplus import Api, Resource, fields

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
cors = CORS()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://postgres:12345@localhost:5432/postgresmobilki'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_AS_ASCII"] = False
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = '123'
db.init_app(app)
migrate.init_app(app, db)
ma.init_app(app)
cors.init_app(app)

api = Api(app = app, prefix = '/api')
name_space_users = api.namespace('users', description='users APIs')
name_space_logins = api.namespace('logins', description='logins APIs')
name_space_appointments = api.namespace('appointments', description='appointments APIs')
name_space_diagnostics = api.namespace('diagnostics', description='diagnostics APIs')

