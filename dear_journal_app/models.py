from django.db import models
from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    # ...
    profile_picture = models.ImageField(
        upload_to='profile_pics/',
        default='#',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username if self.username else "Client"


from django.db import models
from django.contrib.auth.models import User

from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="journals",null=True, blank=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="Draft")

    def __str__(self):
        return f"{self.title} by {self.client.username}"

