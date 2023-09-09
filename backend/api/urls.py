from django.urls import path

from . import views


urlpatterns = [
  path('users/', views.UsersApiView.as_view(), name='users'),
  path('users/login/', views.CustomObtainAuthToken.as_view(), name='login'),
  path('users/logout/', views.LogoutApiView.as_view(), name='logout'),
]
