from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializeres import UserSerializer, HouseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import House

class HouseListCreate(generics.ListCreateAPIView):
    serializer_class = HouseSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return House.objects.all() 
    """ House.objects.filter(author=user)"""

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class HouseDelete(generics.DestroyAPIView):
    serializer_class = HouseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return House.objects.filter(author=user) 


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]