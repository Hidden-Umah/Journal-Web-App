from django.db import models

class Client(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    skills = models.CharField(max_length=200, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="client_profiles/", blank=True, null=True)
    passkey = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username if self.username else "Client"
