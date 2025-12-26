from django.shortcuts import render, redirect
from service.decorators import customer_login

# Create your views here.
@customer_login
def cust_dashboard(request):
    return render(request, 'cust_dashboard.html')

@customer_login
def cart(request):
    return render(request, 'cart.html')

@customer_login
def place_order(request):
    return render(request, 'place_order.html')

@customer_login
def cust_orders(request):
    return render(request, 'cust_orders.html')

@customer_login
def cust_profile(request):
    return render(request, 'cust_profile.html')

@customer_login
def cust_logout(request):
    return redirect('login')