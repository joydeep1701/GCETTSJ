from rest_framework import generics
from django.conf import settings

from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

# Create your views here.
