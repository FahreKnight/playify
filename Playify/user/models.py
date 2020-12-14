from django.db import models

# Create your models here.

class Profile(models.Model):
    username = models.ForeignKey("auth.User",on_delete = models.CASCADE,verbose_name = "Username ")
    password = models.CharField(max_length = 50,verbose_name = "Password")
    profile_image = models.FileField(blank = True,null = True,verbose_name = "Add Profile Image")
    
