from django.urls import path
from . import views

urlpatterns = [
    # Default homescreen
    path("", views.landing, name="landing"),

    # Dashboard (superuser only)
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("dashboard/database/", views.database, name="database"),
    path("dashboard/clients/", views.clients, name="clients"),

    # Delete developer
    path("delete-developer/<int:dev_id>/", views.delete_developer, name="delete_developer"),

    # Join Frontend Team
    path("join_frontend_team/", views.join_frontend_team, name="join_frontend_team"),

    # Clients (normal users)
    path("signup/", views.signup, name="signup"),
    path("signin/", views.signin, name="signin"),
    path("signout/", views.signout, name="signout"),
    path("notepad/", views.notepad_view, name="notepad"),
    path("webpage/", views.webpage_view, name="webpage"),

    # Superusers (admins)
    path("superuserLogin/", views.superuser_login, name="superuser_login"),

    # Client-specific dashboard
    path("client/login/", views.client_login, name="client_login"),
    path("client/dashboard/", views.client_dashboard, name="client_dashboard"),
    path("client/logout/", views.client_logout, name="client_logout"),

    # About
    path("about/", views.about, name="about"),
]
