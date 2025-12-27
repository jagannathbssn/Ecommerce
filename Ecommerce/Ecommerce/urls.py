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
    path('view-prodcut/<int:id>/', v1.product, name='product'),
    path('login/', v1.login, name='login'),
    path('register/', v1.register, name='register'),
    path('contact/', v1.contact, name='contact'),
    path('aboutus/', v1.aboutus, name='aboutus'),
    path('cart/<int:id>/', v1.add_cart, name='add_cart'),

    path('cutomer/customer-dashboard/', v2.cust_dashboard, name='cust_dashboard'),
    path('cutomer/shop/', v2.shop, name='shop'),
    path('cutomer/customer-cart/', v2.cart, name='cart'),
    path('customer/place-order/<int:id>/', v2.place_order, name='place_order'),
    path('cutomer/customer-orders/', v2.cust_orders, name='cust_orders'),

    path('vendor/vendor-dashboard/', v3.ven_dashboard, name='ven_dashboard'),
    path('vendor/manage/products/', v3.manage_products, name="manage_products"),
    path('vendor/mangae/products/api/', v3.manage_pro, name="manage_pro"),
    path('vendor/add-new-products/', v3.add_pro, name="add_pro"),
    path('vendor/update-product-details/<int:id>/', v3.update_pro, name="update_pro"),
    path('vendor/delete-product/<int:id>/', v3.delete_pro, name="delete_pro"),
    path('vendor/manage-orders/', v3.orders, name="orders"),
    path('vendor/vendor-profile/', v3.vprofile, name='vprofile'),
    path('vendor/logout', v3.vlogout, name='vlogout'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
