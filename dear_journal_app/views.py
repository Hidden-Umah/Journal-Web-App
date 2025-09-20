from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Client, Journal

# ----------------------------
# Landing Page
# ----------------------------
def landing(request):
    return render(request, "index.html")

# ----------------------------
# Session Helper (for Clients)
# ----------------------------
def check_client_session(request):
    """Return True if a client is logged in via session."""
    return request.session.get("client_id") is not None

# ----------------------------
# Client Pages
# ----------------------------
def webpage_view(request):
    if not check_client_session(request):
        return redirect("signin")
    return render(request, "notepad/webpage.html", {
        "client": request.session.get("client_username")
    })

def studio_view(request):
    if not check_client_session(request):
        return redirect("signin")
    return render(request, "notepad/studio.html", {
        "client": request.session.get("client_username")
    })

def notepad_view(request):
    if not check_client_session(request):
        return redirect("signin")
    return render(request, "notepad/notepad.html", {
        "client": request.session.get("client_username")
    })

# ----------------------------
# Admin Pages (requires Django User login)
# ----------------------------
def dashboard_view(request):
    return render(request, "dashboard/dashboard.html")

def clients(request):
    clients = Client.objects.all()
    return render(request, "dashboard/clients.html", {"clients": clients})

def database(request):
    # Admins
    admins = User.objects.filter(is_superuser=True)
    # Clients
    clients = Client.objects.all()
    # Journals
    journals = Journal.objects.all()
    context = {
        "admins": admins,
        "clients": clients,
        "journals": journals,
        "total_admins": admins.count(),
        "total_clients": clients.count(),
        "total_journals": journals.count(),
    }
    return render(request, "dashboard/database.html", context)

@login_required
def delete_client(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    client.delete()
    messages.success(request, f"Client '{client.username}' deleted successfully.")
    return redirect("database")

# ----------------------------
# Client Authentication
# ----------------------------
def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # Password match check
        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect("signup")

        # Check if username exists
        if Client.objects.filter(username=username).exists():
            messages.error(request, "Username already taken")
            return redirect("signup")

        # Create client
        client = Client.objects.create(username=username, passkey=password, email=email)

        # Save session
        request.session["client_id"] = client.id
        request.session["client_username"] = client.username

        messages.success(request, f"Welcome {username}, your account was created successfully!")
        return redirect("webpage")

    return render(request, "signup.html")

def signin(request):
    # If already logged in, go to client webpage
    if check_client_session(request):
        return redirect("webpage")

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        try:
            client = Client.objects.get(username=username, passkey=password)
            # Save session
            request.session["client_id"] = client.id
            request.session["client_username"] = client.username

            messages.success(request, f"Welcome back {username}!")
            return redirect("webpage")
        except Client.DoesNotExist:
            messages.error(request, "Invalid username or password")
            return redirect("signin")

    return render(request, "signin.html")

def logout_view(request):
    # Clear session and redirect to landing page
    request.session.flush()
    messages.success(request, "You have been logged out successfully!")
    return redirect("landing")

# ----------------------------
# Client Profile
# ----------------------------
def profile_view(request):
    if not check_client_session(request):
        return redirect("signin")

    client_id = request.session.get("client_id")
    client = get_object_or_404(Client, id=client_id)

    # Show journals linked to this client
    journals = Journal.objects.filter(client=client)

    return render(request, "notepad/profile.html", {
        "client": client,
        "journals": journals
    })

def delete_account(request):
    if not check_client_session(request):
        return redirect("signin")

    client_id = request.session.get("client_id")
    client = get_object_or_404(Client, id=client_id)

    if request.method == "POST":
        client.delete()
        request.session.flush()
        messages.success(request, "Your account has been deleted permanently.")
        return redirect("landing")

    return render(request, "notepad/delete_account.html", {"client": client})