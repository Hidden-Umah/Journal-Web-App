from django.contrib.auth.decorators import login_required , user_passes_test
from django.shortcuts import render

# Create your views here.

def landing (request):
    return render(request,"index.html")

#Sign up view

def signup(request):
    return render(request, "signup.html")

#  the dashboard
@login_required
def dashboard_view(request):
    return render(request,"dashboard/dashboard.html")