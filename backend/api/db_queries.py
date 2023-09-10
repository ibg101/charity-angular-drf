from typing import Dict
from datetime import date

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class Queries(object):
    def __init__(self):
        self.fields = ['id', 'username', 'password'] # improving optimization by narrowing down the query result

    def get_user_by_field(self, field: Dict[str, str | int]):
        try:
            # * asterics is being used for unpacking values, since only() accepts *args
            users_query = get_user_model().objects.only(*self.fields)
            if 'id' in field.keys():
                for value in field.values():
                    return users_query.filter(id=value).first()
            elif 'email' in field.keys():
                for value in field.values():
                    return users_query.filter(email=value).first()
        except ObjectDoesNotExist as err:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get_all_users(self):
        return get_user_model().objects.only(*self.fields).all()
    
    def get_token(self, user_id: int):
        if user_id is not None:
            token, created = Token.objects.get_or_create(user_id=user_id)
            # !!! if token is not created, update it's date to perform proper validation
            if not created:
                token.created = date.today()
                token.save()
            return token
        return None
    

def get_user_by_email(serializer):
    return Queries().get_user_by_field({'email': serializer.validated_data['email']})