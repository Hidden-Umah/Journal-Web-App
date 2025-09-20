from django.contrib import admin

from .models import Client

# Change admin site texts
admin.site.site_header = "My App Admin Dashboard"
admin.site.site_title = "My App Admin"
admin.site.index_title = "Welcome to the Admin Panel 🚀"


admin.site.register(Client)
