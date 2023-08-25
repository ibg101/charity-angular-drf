from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response


class Queries(object):
    def __init__(self):
        self.fields = ['id', 'username', 'password'] # improving optimization by narrowing down the query result

    def get_user_by_id(self, id: int):
        try:
            # * asterics is being used for unpacking values, since only accepts *args
            return get_user_model().objects.only(*self.fields).filter(id=id).first()
        except ObjectDoesNotExist as err:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_all_users(self):
        return get_user_model().objects.only(*self.fields).all()