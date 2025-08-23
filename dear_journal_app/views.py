from django.contrib.auth.decorators import login_required , user_passes_test
from django.shortcuts import render

# Create your views here.

def landing (request):
    return render(request,"index.html")

#  the dashboard
def dashboard_view(request):
    return render(request,"dashboard/dashboard.html")