from django.db import models
from service.models import Users
from django_resized import ResizedImageField
import os
from datetime import datetime

def rename(instance, file):
    ext = file.split(".")[-1]
    te = datetime.now()
    te = te.strftime("%y%m%d%H%M%S")
    new_name = f"{instance.vid}{te}.{ext}"
    return os.path.join("product_photos/", new_name)

# Create your models here.
class Product(models.Model):
    vid = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="products")
    pid = models.AutoField(primary_key=True)
    pname = models.CharField(max_length=600, null=False)
    ptype = models.CharField(max_length=100, null=False, default="Others")
    pstype = models.CharField(max_length=100, null=True, blank=True)
    price = models.PositiveBigIntegerField(null=False)
    stock = models.IntegerField(null=False)
    specs = models.JSONField(null=False, default=dict)
    pdesc = models.TextField(null=True, blank=True)
    key_pnt = models.JSONField(default=list, null=True, blank=True)
    photo = ResizedImageField(
        size = [500, 500],
        upload_to = rename,
        force_format = "PNG"
    )

class Types(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=75, null=False)
    stypes = models.JSONField(default=list, null=False)