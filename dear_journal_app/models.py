from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#  this model is for front end devs

class FrontendDeveloper(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField()
    skills = models.CharField(max_length=200)
    profile_picture = models.ImageField(upload_to="frontend_profiles/", blank=True, null=True)
    passkey = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username if self.username else "Frontend Dev"
