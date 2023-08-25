from typing import Union, Dict

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response


class Queries(object):
    def __init__(self):
        self.fields = ['id', 'username', 'password'] # improving optimization by narrowing down the query result

    def get_user_by_field(self, field: Dict[str, str | int]):
        try:
            # * asterics is being used for unpacking values, since only accepts *args
            users_query = get_user_model().objects.only(*self.fields)
            if 'id' in field.keys():
                for value in field.values():
                    return users_query.filter(id=value).first()
            elif 'username' in field.keys():
                for value in field.values():
                    return users_query.filter(username=value).first()
        except ObjectDoesNotExist as err:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get_all_users(self):
        return get_user_model().objects.only(*self.fields).all()