from rest_framework import generics
from .models import Post, Comment, Community
from .serializers import MakePostSerializer, CreateCommunitySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication


class CreatePost(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = MakePostSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class CreateCommunity(generics.CreateAPIView):
    queryset = Community.objects.all()
    serializer_class = CreateCommunitySerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
