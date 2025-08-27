from django.contrib.auth.decorators import login_required , user_passes_test 
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .models import FrontendDeveloper
from .models import SignupCode

# Create your views here.

def landing (request):
    return render(request,"index.html")

#Sign up view

def signup(request):
    return render(request, "signup.html")

#Sign in view

def signin(request):
    return render(request, "signin.html")

#  the dashboard
@login_required
def dashboard_view(request):
    return render(request,"dashboard/dashboard.html")


# Admin Database

def database(request):
    users = User.objects.all()
    developers = FrontendDeveloper.objects.all()
    return render(request, 'dashboard/database.html' , {
        'users': users,
        'developers':developers})

def join_frontend_team(request):
    if request.method == "POST":
        username = request.POST.get("username")
        bio = request.POST.get("bio")
        skills = request.POST.get("skills")
        profile_picture = request.FILES.get("profile_picture")
        passkey = request.POST.get("passkey")

        # Save into DB
        FrontendDeveloper.objects.create(
            username=username,
            bio=bio,
            skills=skills,
            profile_picture=profile_picture,
            passkey=passkey,
        )

        return redirect("frontend_login")  # redirect to login after submission

    return render(request, "dashboard/join_frontend_team.html")



#  This is for the our clients 
def clients (response):
    return render(response, "dashboard/clients.html")


def clients_storage(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Save into DB
        SignupCode.objects.create(
            username=username,
            email=email,
            password=password,
        )

        return redirect("signin")  # redirect to the journal page
    return render(request, "dashboard/clients.html")
