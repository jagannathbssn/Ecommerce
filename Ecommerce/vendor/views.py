from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

from service.decorators import vendor_login

from vendor.models import Types, Product
from service.models import Users

import json

# Create your views here.
@vendor_login
def ven_dashboard(request):
    return render(request, 'ven_dashboard.html')

@vendor_login
def manage_products(request):
    return render(request, 'manage_pro.html')

@vendor_login
def manage_pro(request):
    ven_id = request.session.get('uid')

    draw = int(request.GET.get('draw', 1))
    start = int(request.GET.get('start', 0))
    length = int(request.GET.get('length', 10))
    search_data = request.GET.get("search[value]", "")
    order_columns = int(request.GET.get('order[0][column]', 0))
    order_dir = request.GET.get('order[0][dir]', 'asc')

    columns = ['pname', 'ptype', 'price', 'stock', 'photo']
    order_field = columns[order_columns]
    if order_dir == 'desc':
        order_field = '-' + order_field

    qr = Product.objects.filter(vid = ven_id)
    if search_data:
        qr = qr.filter(Q(pname__icontains = search_data) 
                    | Q(ptype__icontains = search_data) 
                    | Q(pdesc__icontains = search_data)
                    | Q(specs__icontains = search_data))
    
    total_count = Product.objects.filter(vid = ven_id).count()
    field_count = qr.count()

    

    qr = qr.order_by(order_field)[start:start+length]
    p_data =[]
    sno = start + 1
    ind = 0
  
    for q in qr:
        p_data.append({
        'sno' : sno + ind,
        'name' : q.pname,
        'type' : q.ptype,
        'price': q.price,
        'stock': q.stock,
        'image': f"<img src='/media/{q.photo}' alt='image loading...' width='70px' />" 
                    if q.photo else "No image Found",
        'operations': (
            f"<a href='/vendor/update-product-details/{q.pid}/'>Update</a>"
            f"/"
            f"<a href='/vendor/delete-product/{q.pid}/'>Delete</a>"
        ),
        })
        
        ind += 1

    return JsonResponse({
        'draw': draw,
        'recordsTotal': total_count,
        'recordsFiltered': field_count,
        'data': p_data
    })

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
        return redirect(manage_products)
    else:
        return render(request, 'add_pro.html', data)
    
@vendor_login
def delete_pro(request, id):
    obj = Product.objects.get(pid = id)
    uid = request.session.get('uid')

    if obj.vid.uid == uid:
        obj.delete()
        return redirect(manage_products)
    else:
        messages.error(request, "the product does not exists in your inventory")
        return redirect(ven_dashboard)
    
@vendor_login
def update_pro(request, id):
        
    obj = Product.objects.get(pid = id)
    uid = request.session.get('uid')

    if obj.vid.uid == uid:
        if request.method == "POST":
            pname = request.POST.get('pname1')
            ptype = request.POST.get('dispType1')
            pstype = request.POST.get('dispSubType1')
            price = request.POST.get('price1')
            stock = request.POST.get('stock1')
            descp = request.POST.get('descp1')
            specs = request.POST.get('specs')
            keyp = request.POST.get('keyp')
            photo = request.FILES.get('new_photo')

            keyp = json.loads(keyp)
            specs = json.loads(specs)
            
            obj.pname = pname
            obj.ptype = ptype
            obj.pstype = pstype
            obj.price = price
            obj.stock = stock
            obj.specs = specs
            obj.pdesc = descp
            obj.key_pnt = keyp
            if photo:
                obj.photo = photo

            obj.save()

            messages.success(request, "the product updated sucessfully")

            return redirect('manage_products')

        data = {}
        cat = Types.objects.values_list('type', flat=True)
        data['cat'] = cat
        opt = Types.objects.all()
        data['obj1'] = opt
        data['obj'] = obj
        return render(request, 'update_pro.html', data)
    else:
        messages.error(request, "the product does not exists in your inventory")
        return redirect(ven_dashboard)

@vendor_login
def orders(request):
    return render(request, 'orders.html')

@vendor_login
def vprofile(request):
    data = {}
    us = request.session.get('uid')
    obj = Users.objects.get(uid = us)

    if request.method == "POST":
        cname = request.POST.get('cname')
        caddr = request.POST.get('caddr')
        uname = request.POST.get('uname')
        email = request.POST.get('email')
        ph_no = request.POST.get('ph_no')
        location = request.POST.get('location')
        addr = request.POST.get('addr')

        obj.cname = cname
        obj.caddr = caddr
        obj.uname = uname
        obj.email = email
        obj.ph_no = ph_no
        obj.location = location
        obj.addr = addr

        if request.FILES.get('photo_input'):
            obj.photo = request.FILES['photo_input']

        obj.save()
        messages.success(request, "Profile updated successfully!")

    data['obj'] = obj
    return render(request, 'vprofile.html', data)

@vendor_login
def vlogout(request):
    request.session.flush()
    return redirect('home')