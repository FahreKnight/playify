from rest_framework.authtoken import views
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
import user_auth.views as auth_view


urlpatterns = [
    path('login/', views.obtain_auth_token, name='login'),
    path('register/', auth_view.RegisterView.as_view(), name='register')
]

urlpatterns = format_suffix_patterns(urlpatterns)
