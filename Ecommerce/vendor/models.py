from django.db import models
from service.models import Users
from django_resized import ResizedImageField
import os

def rename(instance, file):
    ext = file.split(".")[-1]
    new_name = f"{instance.pid}.{ext}"
    return os.path.join("product_photos/", new_name)

# Create your models here.
class Product(models.Model):
    vid = models.ForeignKey(Users, on_delete=models.CASCADE)
    pid = models.AutoField(primary_key=True)
    pname = models.CharField(max_length=600, null=False)
    ptype = models.CharField(max_length=100, null=False, default="N/A")
    pstype = models.CharField(max_length=100, null=True, blank=True)
    price = models.BigIntegerField(null=False)
    specs = models.TextField(null=False)
    pdesc = models.TextField(null=False)
    photo = ResizedImageField(
        size = [500, 500],
        upload_to = rename,
        force_format = "PNG"
    )

class Types(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=75, null=False)
    stypes = models.JSONField(default=list, null=False)