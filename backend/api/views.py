from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from .db_queries import Queries, get_user_by_email
from .serializer import (
   UserSerializer, 
   ObtainAuthTokenSerializer, 
   UserEmailSerializer,
)
from .helper_functions import get_id_or_email
from .custom_permissions import IsOwnerOrAdmin
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


# Create your views here.
class UsersApiView(APIView):
   permission_classes = (IsAuthenticated, IsOwnerOrAdmin)
   authentication_classes = [TokenAuthentication]

   def get_permissions(self):
      permissions = super().get_permissions()
      if self.request.method == 'POST':
         permissions = ()
      return permissions

   def get(self, request: Request, *args, **kwargs) -> Response:
      field = get_id_or_email(request.data)
      if field:
         user = Queries().get_user_by_field(field=field)
         serializer = UserSerializer(instance=user)
      else:
         users = Queries().get_all_users()
         serializer = UserSerializer(users, many=True)              
      return Response(data=serializer.data, status=status.HTTP_200_OK)
    
   def post(self, request: Request, *args, **kwargs) -> Response:
      serializer = UserSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         # accessing id by currently created instance, whose data were validated, to ensure there're no vulns 
         user_id = serializer.instance.id
         email = serializer.validated_data['email']
         token = Queries().get_token(user_id)
         data = serializer.data
         data.update({
            'token': token.key,
            'email': email,
         })
         return Response(data=data, status=status.HTTP_201_CREATED)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    
   def put(self, request: Request, *args, **kwargs) -> Response:
      field = get_id_or_email(data=request.data)
      if field:
         user = Queries().get_user_by_field(field=field)
         serializer = UserSerializer(instance=user, data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
         return Response(status=status.HTTP_400_BAD_REQUEST)
      else:
         return Response(status=status.HTTP_400_BAD_REQUEST)
         
   def delete(self, request: Request, *args, **kwargs) -> Response:
       field = get_id_or_email(request.data)
       if field:
         user = Queries().get_user_by_field(field=field)
         user.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)
       else:
         return Response(status=status.HTTP_400_BAD_REQUEST)
       

class LoginApiView(APIView):
   def post(self, request, *args, **kwargs):
      serializer = ObtainAuthTokenSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
         user = get_user_by_email(serializer)
         if user is not None:
            token = Queries().get_token(user_id=user.id)
            return Response({'token': token.key, 'email': user.email})
         return Response(status=status.HTTP_404_NOT_FOUND)
      

class LogoutApiView(APIView):
   """
   Genetic APIView for Logout && Delete-token purposes.
   """
   def post(self, request, *args, **kwargs):
      serializer = UserEmailSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
         user = get_user_by_email(serializer)
         user.auth_token.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)


class CheckAuthToken(APIView):
   """
   Invoke this endpoint to define whether auth-token exists or not.
   """
   def post(self, request, *args, **kwargs):
      serializer = UserEmailSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
         user = get_user_by_email(serializer)
         token = Queries().get_token(user_id=user.id)
         if token is not None:
            return Response({'token': token.key}, status=status.HTTP_200_OK)
         return Response(status=status.HTTP_404_NOT_FOUND)