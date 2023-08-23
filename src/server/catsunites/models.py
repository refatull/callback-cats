from catsunites import db, app
from flask_login import UserMixin, current_user


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)


class Cat(db.Model):
    __tablename__ = 'cats'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False, default=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    seller = db.relationship('User', backref='cats')


class Adoption(db.Model):
    __tablename__ = "adoptions"
    id = db.Column(db.Integer, primary_key=True)
    cat_id = db.Column(db.Integer, db.ForeignKey("cats.id"))
    cat = db.relationship("Cat", backref="adoptions")
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    owner = db.relationship("User", backref="adoptions")
    buyer_id = db.Column(db.Integer, nullable=False)
    buyer_message = db.Column(db.String, nullable=True)
    # buyer contact info
    contact_info = db.Column(db.String, nullable=False)
    request_accepted = db.Column(db.Boolean, default=False)
    request_rejected = db.Column(db.Boolean, default=False)
    owner_message = db.Column(db.String, nullable=True)


app.app_context().push()
db.create_all()
