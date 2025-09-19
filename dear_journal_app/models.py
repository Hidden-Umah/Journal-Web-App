from django.db import models
from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="client_profiles/", blank=True, null=True)
    passkey = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username if self.username else "Client"


from django.db import models
from django.contrib.auth.models import User

from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("draft", "Draft"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="journals")
    title = models.CharField(max_length=200)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="draft")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.username}"
