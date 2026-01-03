from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib import messages
from django.http import JsonResponse
from service.models import Users
from vendor.models import Product as Pro


def home(request):
    obj_list = Pro.objects.filter(stock__gt=0)

    paginator = Paginator(obj_list, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    if 'cart' not in request.session:
        request.session['cart'] = {}

    data = {
        'objs': page_obj
    }
    return render(request, 'home.html', data)

def product(request, id):
    data = {}
    try:
        obj = Pro.objects.get(pid = id)
        data['obj'] = obj
    except:
        return redirect('home')
    return render(request, 'view_pro.html', data)

def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        try:
            obj = Users.objects.get(email = email)
            if obj:
                if obj.passkey != password:
                    messages.error(request, "Please check the password and try again")
                    return render(request, "login.html")
                elif obj.passkey == password:
                    if obj.utype == "Vendor":
                        request.session['uid'] = obj.uid
                        request.session['uname'] = obj.uname
                        request.session['user_type'] = "Vendor"
                        return redirect('ven_dashboard')
                    if obj.utype == "Customer":
                        request.session['uid'] = obj.uid
                        request.session['uname'] = obj.uname
                        request.session['user_type'] = "Customer"
                        return redirect('shop')
        except Exception as e:
            messages.error(request, "please check the email")
            messages.error(request, "please try again email not found")
            return render(request, "login.html")
    return render(request, "login.html")

def register(request):
    if request.method == "POST":
        utype = request.POST.get('type')
        uname = request.POST.get('uname')
        email = request.POST.get('email')
        ph_no = request.POST.get('ph_no')
        password = request.POST.get('password')
        loca = request.POST.get('loca')
        addr = request.POST.get('addr')
        photo = request.FILES.get('photo')
        if utype == "Vendor":
            com_name = request.POST.get('cname')
            com_addr = request.POST.get('com_addr')
        elif utype == "Customer":
            com_name = "N/A"
            com_addr = "N/A"
        try:
            Users.objects.create(
                utype = utype,
                cname = com_name,
                caddr = com_addr,
                uname = uname,
                email = email,
                ph_no = ph_no,
                passkey = password,
                location = loca,
                addr = addr
            )
            obj = Users.objects.get(email = email)
            obj.photo = photo
            obj.save()
            messages.success(request, "User Registration Sucessful")
            return redirect('login')
        except Exception as e:
            messages.error(request, "User Registration Un-Sucessful")
            return redirect('register')
    return render(request, 'register.html')

def add_cart(request, id):
    cart = request.session.get('cart', {})
    product_id = str(id)

    if product_id in cart:
        cart[product_id] += 1
    else:
        cart[product_id] = 1

    request.session['cart'] = cart
    request.session.modified = True

    print(cart)
    return JsonResponse({'success': True, 'cart': cart})

def contact(request):
    return render(request, 'contact.html')

def aboutus(request):
    return render(request, 'aboutus.html')
    
