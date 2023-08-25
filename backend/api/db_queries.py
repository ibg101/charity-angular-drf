from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model


class Queries(object):
    def __init__(self):
        self.fields = ['id', 'username', 'password'] # improving optimization by narrowing down the query result

    def get_user_by_id(self, id: int):
        try:
            user = get_user_model().objects.only(self.fields).filter(id=id).first()
        except ObjectDoesNotExist as err:
            user = None
        return user

    def get_all_users(self):
        return get_user_model().objects.only(self.fields).all()