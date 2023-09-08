from django.urls import path

from . import views


urlpatterns = [
  path('users/', views.UsersApiView.as_view(), name='users'),
  path('auth/', views.CustomObtainAuthToken.as_view(), name='authtoken'),
]
