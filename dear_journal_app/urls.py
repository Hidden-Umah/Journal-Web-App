from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing, name="landing"),
    path("signup/", views.signup, name="signup"),
    path("signin/", views.signin, name="signin"),
    path("signout/", views.logout_view, name="signoutt"),
    path("webpage/", views.webpage_view, name="webpage"),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("clients/", views.clients, name="clients"),
    path("notepad/", views.notepad_view, name="notepad"),
    path("studio/", views.studio_view, name="studio"),  # ← add this
    path("dashboard/database/", views.database, name="database"),
   
     # ... your existing paths ...
    path("database/", views.database, name="database"),
    path("database/delete-client/<int:client_id>/", views.delete_client, name="delete_client"),

    
]
