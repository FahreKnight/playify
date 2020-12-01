from django import forms
from .models import Article


class LoginForm(forms.Form):
    username = forms.CharField(label = "User Name")
    password = forms.CharField(label = "Password", widget = forms.PasswordInput)
class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ["title","content","article_image"]