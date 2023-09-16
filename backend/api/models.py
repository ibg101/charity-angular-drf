from typing import Any, Optional

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.authtoken.models import Token


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password, **extra_fields):
        if not email or not username:
            raise ValueError('Email field is required.') 
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email=email, username=username, password=password, **extra_fields)


class CustomUser(AbstractUser):
    objects = CustomUserManager()
    username = models.CharField(
        unique=False,
        max_length=150,
        help_text=(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator()],
    )
    email = models.EmailField(
        max_length=254,
        blank=False, 
        unique=True,
    )
    confirm_password = models.CharField(max_length=128)
    remember_me = models.BooleanField(default=False, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


# on every user creation -> create appropriated token 
@receiver(post_save, sender=get_user_model())
def add_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance) 
