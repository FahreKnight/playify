from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('register/',views.register,name = "register"),
    path('login/',views.loginUser,name = "login"),
    path('logout/',views.logoutUser,name = "logout"),
    path('profile/', views.profile , name = "profile"),
    path('profilesettings/', views.profilesettings , name = "profilesettings"),
    url(r'profile/(?P<username>[a-zA-Z0-9]+)$', views.get_user_profile),
    url(r'profile/following/(?P<username>[a-zA-Z0-9]+)$', views.following),
    

]
