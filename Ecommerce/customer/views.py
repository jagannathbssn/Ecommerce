from django.shortcuts import render, redirect
from django.core.paginator import Paginator

from django.contrib import messages
from service.decorators import customer_login
from vendor.models import Product as Pro
from service.models import Users

# Create your views here.

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
    if request.method == "POST":
        pid = id
        cid = request.POST.get('cust_id')
        qty = request.POST.get('quantity')
        price = request.POST.get('total_price')

        print(pid)
        print(cid)
        print(qty)
        print(price)
        return redirect('home')
    obj = Pro.objects.get(pid = id)
    data = {}
    data['obj'] = obj
    return render(request, 'place_order.html', data)

@customer_login
def cart(request):
    return render(request, 'cart.html')


@customer_login
def cust_orders(request):
    return render(request, 'cust_orders.html')

@customer_login
def cust_profile(request):
    id = request.session.get('uid')
    obj = Users.objects.get(uid = id)
    if request.method == "POST":
        obj.cname = request.POST.get('uname')
        obj.email = request.POST.get('email')
        obj.ph_no = request.POST.get('ph_no')
        obj.location = request.POST.get('location')
        obj.addr = request.POST.get('addr')

        if 'photo_input' in request.FILES:
            obj.photo = request.FILES['photo_input']

        obj.save()
        messages.success(request, "Profile updated successfully!")

    data ={'obj' : obj}
    return render(request, 'cust_profile.html', data)

@customer_login
def cust_logout(request):
    request.session.flush()
    return redirect('login')