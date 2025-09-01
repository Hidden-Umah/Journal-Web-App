from django.contrib.auth.decorators import login_required , user_passes_test 
from django.contrib.auth import login
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import render, redirect
from .models import FrontendDeveloper

# Create your views here.

def landing (request):
    return render(request,"index.html")

# Users Notepads
@login_required
def notepad_view(request):
    return render(request, "notepad/studio.html")

#  the Admin dashboard
@login_required
def dashboard_view(request):
    return render(request,"dashboard/dashboard.html")

#Clients dashboard page
@login_required
def clients(request):
    return render(request, "dashboard/clients.html")


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

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # check if user exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken")
            return redirect("signup")

        # Save to DB
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # log them in immediately
        login(request, user)

        # redirect to notepad instead of dashboard
        return redirect("notepad")

    return render(request, "signup.html")



def signin(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("notepad")   # redirect to notepad after login
        else:
            messages.error(request, "Invalid username or password")
            return redirect("signin")

    return render(request, "signin.html")
