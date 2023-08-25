from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from .db_queries import Queries
from .serializer import UserSerializer
from .custom_permissions import IsOwnerOrAdmin
from rest_framework.authentication import TokenAuthentication


# Create your views here.
class UsersApiView(APIView):
    permission_classes = (IsOwnerOrAdmin, )
    authentication_classes = [TokenAuthentication]

    def get(self, request: Request, *args, **kwargs) -> Response:
        user_id: int = request.data['id']
        if user_id is not None:
          user = Queries().get_user_by_id(user_id)
          if user is not None:
            serializer = UserSerializer(instance=user)
          return Response(status=status.HTTP_404_NOT_FOUND)
        else:
           users = Queries().get_all_users()
           serializer = UserSerializer(users, many=True)
        return Response(data=serializer, status=status.HTTP_200_OK)
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(data=serializer, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request: Request, *args, **kwargs) -> Response:
       user_id: int = request.data['id']
       user = Queries().get_user_by_id(user_id)
       if user is not None:
          serializer = UserSerializer(instance=user, data=request.data)
          if serializer.is_valid():
             serializer.save()
             return Response(data=serializer, status=status.HTTP_200_OK)
          return Response(status=status.HTTP_400_BAD_REQUEST)
       return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request: Request, *args, **kwargs) -> Response:
       user_id: int = request.data['id']
       user = Queries().get_user_by_id(user_id)
       user.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)