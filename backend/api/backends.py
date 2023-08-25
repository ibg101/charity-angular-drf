from typing import Any, Optional

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model


class EmailBackend(BaseBackend):
    """
    Allows to authenticate an User by Email.
    """
    def authenticate(self, request: HttpRequest, username: str, password: str, **kwargs: Any) -> AbstractBaseUser | None:
        try:
            # email=username, since it's overriden in models.py
            user = get_user_model().objects.filter(email=username).first()
            if user is not None and user.check_password(password):
              return user
            return None
        except ObjectDoesNotExist as err:
            return None
    
    # allowing to login (MUST BE OVERRIDEN)
    def get_user(self, user_id: int) -> AbstractBaseUser | None:
        try:
            user = get_user_model().objects.filter(id=user_id).first()
            return user
        except ObjectDoesNotExist as err:
            return None