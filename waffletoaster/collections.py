import mongoengine as me

from enum import Enum


"""Enumerators for EnumFields."""

class BackgroundType(Enum):
    EMPTY = 0
    GRID = 1
    LINES = 2
    CUSTOM = 3


"""Validation functions for the collections' fields."""

def _not_empty(val):
    if not val:
        raise ValidationError('value cannot be empty')


"""Collection models."""

class User(me.Document):
    username = me.StringField(required = True, unique = True, validation = _not_empty)
    password = me.StringField(required = True, validation = _not_empty)

    meta = {'auto_create_index': True}


class Card(me.EmbeddedDocument):
    title = me.StringField(default = 'Card Title')
    content = me.StringField(default = 'Card Content')
    image = me.FileField()
    width = me.IntField(default = 50)
    height = me.IntField(default = 50)
    x = me.IntField(required = True, validation = _not_empty)
    y = me.IntField(required = True, validation = _not_empty)
    linked_board = me.ReferenceField('Board', default = None)

    meta = {'auto_create_index': True}


class Board(me.Document):
    name = me.StringField(required = True, unique = True, validation = _not_empty)
    canvas_width = me.IntField(default = 1000)
    canvas_height = me.IntField(default = 1000)
    background_type = me.EnumField(BackgroundType, default = BackgroundType.EMPTY)
    background_linespace = me.IntField(default = 0.5)
    cards = me.EmbeddedDocumentListField(Card)
    owner = me.ReferenceField('User')
    is_root = me.BooleanField(required = True)

    meta = {'auto_create_index': True}