from rest_framework import serializers
from .models import Post, Comment, Community


class MakePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title', 'content',
                  'created_on', 'author', 'community', 'likes')

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post


class CreateCommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ('id', 'name', 'owner')

    def create(self, validated_data):
        community = Community.objects.create(**validated_data)
        return community
