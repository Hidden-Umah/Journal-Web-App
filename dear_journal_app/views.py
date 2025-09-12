from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages

from .models import ClientProfile, FrontendDeveloper


# ======================
# LANDING & STATIC PAGES
# ======================

def landing(request):
    return render(request, "index.html")

def about(request):
    return render(request, "about.html")


# ======================
# DASHBOARDS
# ======================

@login_required
def notepad_view(request):
    return render(request, "notepad/studio.html")

@login_required
def dashboard_view(request):
    admin_count = User.objects.filter(is_superuser=True).count()
    return render(request, "dashboard/dashboard.html", {
        "admin_count": admin_count
    })

@login_required
def clients(request):
    return render(request, "dashboard/clients.html")

@login_required
def webpage_view(request):
    return render(request, "notepad/webpage.html")

@login_required
def database(request):
    admins = User.objects.filter(is_superuser=True)
    clients = ClientProfile.objects.all()
    developers = FrontendDeveloper.objects.all()
    return render(request, 'dashboard/database.html', {
        'admins': admins,
        'clients': clients,
        'developers': developers,
    })


# ======================
# FRONTEND DEV TEAM
# ======================

def join_frontend_team(request):
    if request.method == "POST":
        username = request.POST.get("username")
        bio = request.POST.get("bio")
        skills = request.POST.get("skills")
        profile_picture = request.FILES.get("profile_picture")
        passkey = request.POST.get("passkey")

        FrontendDeveloper.objects.create(
            username=username,
            bio=bio,
            skills=skills,
            profile_picture=profile_picture,
            passkey=passkey,
        )
        return redirect("dashboard")

    return render(request, "dashboard/join_frontend_team.html")

@login_required
def delete_developer(request, dev_id):
    developer = get_object_or_404(FrontendDeveloper, id=dev_id)
    if request.method == "POST":
        developer.delete()
        return redirect("database")
    return redirect("database")


# ======================
# CLIENT AUTH
# ======================

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken")
            return redirect("signup")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered")
            return redirect("signup")

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        ClientProfile.objects.create(user=user)

        messages.success(request, "Account created successfully. Please log in.")
        return redirect("signin")

    return render(request, "signup.html")


def signin(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None and not user.is_superuser:  # ✅ Only clients
            login(request, user)
            messages.success(request, "Logged in successfully")
            return redirect("webpage")
        else:
            messages.error(request, "Invalid username or password")
            return redirect("signin")

    return render(request, "signin.html")


def signout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully")
    return redirect("signin")


# ======================
# SUPERUSER AUTH
# ======================

def superuser_login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            if user.is_superuser:  # ✅ Only superusers allowed
                login(request, user)
                return redirect("dashboard")
            else:
                form.add_error(None, "Only superusers can log in here.")
    else:
        form = AuthenticationForm()

    return render(request, "superuserLogin.html", {"form": form})


# ======================
# CLIENT DASHBOARD (SEPARATE)
# ======================

def client_login(request): 
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None and not user.is_superuser:  # ✅ block admins here
            login(request, user)
            messages.success(request, "Login successful")
            return redirect("client_dashboard")
        else:
            messages.error(request, "Invalid username or password")
            return redirect("client_login")

    return render(request, "signin.html")  # or custom client login page


def client_dashboard(request):
    if not request.user.is_authenticated or request.user.is_superuser:
        return redirect("client_login")  # only real clients
    return render(request, "webpage.html", {"client": request.user})


def client_logout(request):
    logout(request)
    messages.success(request, "You have been logged out.")
    return redirect("client_login")
