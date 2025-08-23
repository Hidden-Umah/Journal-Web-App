from django.contrib.auth.decorators import login_required , user_passes_test 
from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.

def landing (request):
    return render(request,"index.html")

#  the dashboard
@login_required
def dashboard_view(request):
    return render(request,"dashboard/dashboard.html")


# Admin Database

def database(request):
    users = User.objects.all()
    return render(request, 'dashboard/database.html' , {'users': users})