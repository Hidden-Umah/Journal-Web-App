from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Client
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.models import User
from .models import Journal, Client



# ----------------------------
# Landing Page
# ----------------------------
def landing(request):
    return render(request, "index.html")


# ----------------------------
# Client Pages (requires login)
# ----------------------------
def check_client_session(request):
    """Helper to check if client is logged in"""
    return request.session.get("client_id")

@login_required
def webpage_view(request):
    return render(request, "notepad/webpage.html", {
        "user": request.user
    })


@login_required
def studio_view(request):
    if not check_client_session(request):
        return redirect("signin")
    return render(request, "notepad/studio.html")


# ----------------------------
# Admin Pages
# ----------------------------

def dashboard_view(request):
    return render(request, "dashboard/dashboard.html")



def clients(request):
    return render(request, "dashboard/clients.html")




from .models import Journal

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Journal

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Journal

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Client, Journal  # import Client + Journal

def database(request):
    # Superusers (admins)
    admins = User.objects.filter(is_superuser=True)

    # Clients (your custom model)
    clients = Client.objects.all()

    # Journals (linked to users for now, can be updated to link to Client if you prefer)
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
    # If already logged in, go to webpage
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


from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required  # ensures only logged-in users can access
def notepad_view(request):
    return render(request, "studio.html")  # or "notepad.html" if that's the template


from django.shortcuts import get_object_or_404

def delete_client(request, client_id):
    client = get_object_or_404(Client, id=client_id)
    client.delete()
    messages.success(request, f"Client '{client.username}' deleted successfully.")
    return redirect("database")
