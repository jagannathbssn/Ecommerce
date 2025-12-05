from django.shortcuts import render
from service.decorators import customer_login

# Create your views here.
@customer_login
def cust_dashboard(request):
    return render(request, 'cust_dashboard.html')
