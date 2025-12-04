from django.shortcuts import render
from service.decorators import vendor_login

# Create your views here.
@vendor_login
def ven_dashboard(request):
    return render(request, 'ven_dashboard.html')