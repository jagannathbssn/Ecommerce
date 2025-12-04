from django.shortcuts import render, redirect
from django.contrib import messages
from service.models import Users

# Create your views here.
def home(request):
    return render(request, 'home.html')

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
                    print("hi\n"*23)
                    if obj.utype == "Vendor":
                        request.session['uid'] = obj.uid
                        request.session['user_type'] = "Vendor"
                        return redirect('ven_dashboard')
                    if obj.utype == "Customer":
                        request.session['uid'] = obj.uid
                        request.session['user_type'] = "Customer"
                        return redirect('cust_dashboard')
        except Exception as e:
            messages.error(request, "please check the email")
            messages.error(request, "please try again email not found")
            return render(request, "login.html")
    print("hi\n"*23)
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

def contact(request):
    return render(request, 'contact.html')

def aboutus(request):
    return render(request, 'aboutus.html')