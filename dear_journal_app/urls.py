from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # the default homescreen
    path("",views.landing , name='landing'),

    # the dashboard 
    path("dashboard/",views.dashboard_view,name = "dashboard")
    

]