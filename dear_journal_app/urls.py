from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # the default homescreen
    path("",views.landing , name='landing'),

    # the dashboard 
    path("dashboard/",views.dashboard_view,name = "dashboard"),

    # Admin Database 
    path("dashboard/database/",views.database , name = 'database' ),

    # Login and logout
    path("login/", auth_views.LoginView.as_view(template_name="adminLogin.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page="login"), name="logout"),

    #  Join Frontends 
    path("join_frontend_team/", views.join_frontend_team , name = 'join_frontend_team'),



    #Sign up page
    path("signup/", views.signup, name="signup"),

    # Clients dashboard page
    path("dashboard/clients/", views.clients, name = 'clients'),



    

        path("signup/", views.signup, name="signup"),
    
    #Sign in page
    path("signin/", views.signin, name="signin")
]
