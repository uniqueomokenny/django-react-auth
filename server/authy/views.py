from django.contrib.auth import authenticate, get_user_model
import rest_framework
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .permissions import UserPermission
from .serializers import UserSerializer


User = get_user_model()


class LoginViewSet(viewsets.ViewSet):
   permission_classes = (rest_framework.permissions.AllowAny,)

   def create(self, request, *args, **kwargs):
      user = authenticate(request, **request.data)

      if user:
         (token, _) = Token.objects.get_or_create(user=user)

         data = {"token": token.key, "user.id":user.id, "username": user.username}

         #utils.createAction(user, "logged in")
         return Response(data)

      return Response(["Invalid email/password."], status=status.HTTP_401_UNAUTHORIZED)


class LogoutViewSet(viewsets.ViewSet):
   def list(self, request, *args, **kwargs):
      try:
         Token.objects.get(user=request.user).delete()
      except Token.DoesNotExist:
         pass

      #utils.createAction(request.user, "logged out")
      return Response()


class UserViewSet(viewsets.ModelViewSet):
   permission_classes = (UserPermission,)
   queryset = User.objects.all()
   serializer_class = UserSerializer

   def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)

      if serializer.is_valid():
         user = serializer.save()
         return Response({"token": user.auth_token.key}, status=status.HTTP_201_CREATED)

      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
