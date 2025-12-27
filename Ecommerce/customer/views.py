from django.shortcuts import render, redirect
from django.core.paginator import Paginator

from service.decorators import customer_login
from vendor.models import Product as Pro

# Create your views here.
@customer_login
def cust_dashboard(request):
    return render(request, 'cust_dashboard.html')

@customer_login
def shop(request):
    obj_list = Pro.objects.filter(stock__gt=0)

    paginator = Paginator(obj_list, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    data = {
        'objs': page_obj
    }
    return render(request, 'shop.html', data)

@customer_login
def place_order(request, id):
    abd = id
    print(abd)
    return render(request, 'place_order.html')

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