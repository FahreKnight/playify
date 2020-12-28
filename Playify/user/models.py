from django.contrib.auth.models import User
from django.db import models
from ckeditor.fields import RichTextField
from django.db.models.signals import post_save
from PIL import Image

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    following = models.ManyToManyField(User, related_name='following', blank=True)
    password = models.CharField(max_length = 50,verbose_name = "Password")
    status = models.CharField(max_length = 50,verbose_name = "Status",default="def status", blank=True)
    image= models.ImageField(default='default.jpg', upload_to='profile_pics')
    
    def __str__(self):
        return f'{self.user.username} Profile'

    def create_profile(sender, **kwargs):
        user = kwargs["instance"]
        if kwargs["created"]:
            profile = Profile(user=user)
            profile.save()
    post_save.connect(create_profile, sender=User)
    def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)