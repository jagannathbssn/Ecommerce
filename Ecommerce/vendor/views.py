from django.shortcuts import render, redirect
from service.decorators import vendor_login
from vendor.models import Types

# Create your views here.
@vendor_login
def ven_dashboard(request):
    return render(request, 'ven_dashboard.html')

@vendor_login
def manage_pro(request):
    return render(request, "manage_pro.html")

@vendor_login
def add_pro(request):
    data = {}
    cat = Types.objects.values_list('type', flat=True)
    data['cat'] = cat
    opt = Types.objects.all()
    data['obj'] = opt
    return render(request, 'add_pro.html', data)

@vendor_login
def orders(request):
    return render(request, 'orders.html')

@vendor_login
def vprofile(request):
    return render(request, 'vprofile.html')

@vendor_login
def vlogout(request):
    return redirect('home')