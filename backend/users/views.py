from rest_framework import generics
from django.conf import settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes

from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

# Create your views here.
@authentication_classes([])
@permission_classes([])
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key,
            'name': token.user.name,
            'stream': token.user.stream,
            'univ_roll':token.user.univ_roll,
            'is_staff':token.user.is_staff})
