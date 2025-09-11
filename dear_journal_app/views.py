from django.contrib.auth.decorators import login_required , user_passes_test 
from django.contrib.auth import login
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
<<<<<<< HEAD
from django.shortcuts import render , get_object_or_404, redirect
=======
from django.contrib import messages
from django.shortcuts import render, redirect
>>>>>>> df5c98fdd0a9370a129f7e0da11f94d25604eaef
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
    admin_count = User.objects.filter(is_superuser = True).count() # Count superusers
    return render(request,"dashboard/dashboard.html",{
        "admin_count":admin_count
    })

#Clients dashboard page
@login_required
def clients(request):
    return render(request, "dashboard/clients.html")

# Webpage
@login_required
def webpage_view(request):
    return render(request, "notepad/webpage.html")

# Admin Database
@login_required
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
        
        # check if email exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered")
            return redirect("signup")

        # Save to DB
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

<<<<<<< HEAD
        return redirect("signin")  # redirect to the journal page
    return render(request, "dashboard/clients.html")




#  Delete Developer 
def delete_developer(request, dev_id):
    developer = get_object_or_404(FrontendDeveloper, id=dev_id)

    if request.method == "POST":
        developer.delete()
        return redirect("database")  # after deleting, go back to database page

    return redirect("database")

# views for About Page
def about(request):
    return render(request, "about.html")
=======
        # log them in immediately
        login(request, user)

        # Signup success message
        messages.success(request, f"Welcome {username}, your account was created successfully!")

        # redirect to webpage instead of notepad
        return redirect("webpage")

    return render(request, "signup.html")



def signin(request):
    if request.user.is_authenticated:
        return redirect("webpage")
    
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in successfully")
            return redirect("webpage")   # redirect to webpage after login
        else:
            messages.error(request, "Invalid username or password")
            return redirect("signin")    # go back to signin, not webpage

    return render(request, "signin.html")

def signout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully")
    return redirect("signin")
>>>>>>> df5c98fdd0a9370a129f7e0da11f94d25604eaef
