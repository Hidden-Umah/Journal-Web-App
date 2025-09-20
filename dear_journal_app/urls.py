from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing, name="landing"),
    path("signup/", views.signup, name="signup"),
    path("signin/", views.signin, name="signin"),
    path("webpage/", views.webpage_view, name="webpage"),
    path("studio/", views.studio_view, name="studio"),
    path("notepad/", views.notepad_view, name="notepad"),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("clients/", views.clients, name="clients"),
    path("dashboard/database/", views.database, name="database"),
    path("database/delete-client/<int:client_id>/", views.delete_client, name="delete_client"),
    path("profile/", views.profile_view, name="profile"),
    path("delete-account/", views.delete_account, name="delete_account"),
    path("signoutt/", views.signout_view, name="signoutt"),
    path("logout/", views.signout_view, name="logout"),

]
