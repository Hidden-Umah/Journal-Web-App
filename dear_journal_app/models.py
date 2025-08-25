from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#  this model is for front end devs

class FrontendDeveloper (models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    bio = models.TextField(blank = True , null = True)
    skills = models.CharField(max_length=255, blank = True , null=True)
    profile_picture = models.ImageField(upload_to='frontend_profiles/', blank=True,null=True)

    def __str__(self):
        return f" {self.user.username}'s Frontend Profile"