from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
import community.views as views

urlpatterns = [
    path('create-post/', views.CreatePost.as_view(), name='create-post'),
    path('create-community/', views.CreateCommunity.as_view(),
         name='create-community'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
