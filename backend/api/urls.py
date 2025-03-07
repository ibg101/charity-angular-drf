from django.urls import path

from . import views


urlpatterns = [
  path('users/', views.UsersApiView.as_view(), name='users'),
  path('users/login/', views.LoginApiView.as_view(), name='login'),
  path('users/logout/', views.LogoutApiView.as_view(), name='logout'),
  path('users/check-token/', views.CheckAuthToken.as_view(), name='token-validity'),
]
