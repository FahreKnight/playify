from django import forms
from django.contrib import auth
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.models import User
from django.db.models.fields import AutoField, NullBooleanField
from django.http import request
from .models import Profile

class LoginForm(forms.Form):
    username = forms.CharField(label = "Username")
    password = forms.CharField(label = "Password",widget = forms.PasswordInput)


class RegisterForm(forms.Form):
    username = forms.CharField(max_length = 50,label = "Username")
    password = forms.CharField(max_length=20,label = "Password",widget = forms.PasswordInput)
    confirm = forms.CharField(max_length=20,label ="Correct Password",widget = forms.PasswordInput)
    
    def clean(self):
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")
        confirm = self.cleaned_data.get("confirm")
    
        if User.objects.filter(username=self.cleaned_data['username']).exists():
            raise forms.ValidationError("This Username is already taken")


        if password and confirm and password != confirm:
            raise forms.ValidationError("Passwords are not same")

        values = {
            "username" : username,
            "password" : password
        }
        return values


class SettingsForm(forms.ModelForm):
    username = forms.CharField(max_length = 50,label = "Username")
    change= forms.BooleanField(label="Change username",required=False)
    class Meta:
        model = User
        fields = ['username']

    def clean(self):
        username = self.cleaned_data.get("username")
        
        if User.objects.filter(username=self.cleaned_data['username']).exists() and self.cleaned_data.get("change"):
            raise forms.ValidationError("This Username is already taken")


        values = {
            "username" : username
        }
        return values

class ProfileForm(forms.ModelForm):
    status = forms.CharField(max_length = 50,label = "Status ")
    image = forms.ImageField(required=False)
    class Meta:
        model = Profile
        fields = ['status','image']

    def clean(self):
        status = self.cleaned_data.get("status")
        image= self.cleaned_data.get("image")
        values = {
            "status" : status,
            "image" : image
        }
        return values

class FollowButton(forms.Form):
    usern = forms.Field.bound_data
