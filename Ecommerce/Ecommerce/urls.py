"""
URL configuration for Ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from service import views as v1
from customer import views as v2
from vendor import views as v3

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', v1.home, name='home'),
    path('login/', v1.login, name='login'),
    path('register/', v1.register, name='register'),
    path('contact/', v1.contact, name='contact'),
    path('aboutus/', v1.aboutus, name='aboutus'),

    path('cutomer/customer_dashboard/', v2.cust_dashboard, name='cust_dashboard'),

    path('vendor/vendor_dashboard/', v3.ven_dashboard, name='ven_dashboard'),    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
