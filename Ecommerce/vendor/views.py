from django.shortcuts import render, redirect
from django.contrib import messages
from service.decorators import vendor_login

from vendor.models import Types, Product
from service.models import Users

import json

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
    if request.method == "POST":
        vid = request.POST.get("vendor_id")
        pn = request.POST.get("pname")
        pty = request.POST.get("type")
        psty = request.POST.get("stype")
        stype = request.POST.get("o_stype")
        pri = request.POST.get("price")
        sto = request.POST.get("stock")
        spe = request.POST.get("specs")
        desc = request.POST.get("descp")
        key_po = request.POST.get("keyp")
        photo = request.FILES.get("pho")

        spe = json.loads(spe)
        key_po = json.loads(key_po)
        if pty == "Others" or psty == "Others":
            psty = stype

        vid = Users.objects.get(uid = vid)
        
        try:
            Product.objects.create(
            vid = vid,
            pname = pn,
            ptype = pty,
            pstype = psty,
            price = pri,
            stock = sto,
            specs = spe,
            pdesc = desc,
            key_pnt = key_po,
            photo = photo)
            messages.success(request, "you have sucessfully added a new Product")
        except:
            messages.error(request, "Some error has occured, please try again")
            return render(request, 'add_pro.html', data)
        return redirect(manage_pro)
    else:
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