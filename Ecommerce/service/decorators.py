from django.shortcuts import redirect
from functools import wraps

def customer_login(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.session.get("user_type") == "Customer":
            return func(request, *args, **kwargs)
        return redirect('login')
    return wrapper

def vendor_login(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.session.get("user_type") == "Vendor":
            return func(request, *args, **kwargs)
        return redirect('login')
    return wrapper
