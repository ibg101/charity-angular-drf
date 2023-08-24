from django.contrib.auth import get_user_model


class Queries(object):
    def __init__(self):
        self.fields = ['id', 'username', 'password'] # improving optimization by narrowing down the query result

    def get_user_by_id(self, id: int):
        return get_user_model().objects.only(self.fields).filter(id=id).first()

    def get_all_users(self):
        return get_user_model().objects.only(self.fields).all()