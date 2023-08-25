from django.urls import path, include

from rest_framework.authtoken.views import ObtainAuthToken

from . import views


urlpatterns = [
  path('users/', views.UsersApiView.as_view(), name='users'),
  path('auth/', ObtainAuthToken.as_view(), name='authtoken'),
]
