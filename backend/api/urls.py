from django.urls import path

from . import views


urlpatterns = [
  path('users/', views.UsersApiView.as_view(), name='users'),
  path('users/login/', views.LoginApiView.as_view(), name='login'),
  # decided to create separated api endpoints with the same functionality in favor of readibility
  path('users/logout/', views.LogoutApiView.as_view(), name='logout'),
]
