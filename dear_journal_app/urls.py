from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing, name="landing"),
    path("signup/", views.signup, name="signup"),
    path("signin/", views.signin, name="signin"),
    path("signout/", views.signout, name="signout"),
    path("webpage/", views.webpage_view, name="webpage"),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("clients/", views.clients, name="clients"),
    path("notepad/", views.notepad_view, name="notepad"),
    path("database/", views.database, name="database"),
]
