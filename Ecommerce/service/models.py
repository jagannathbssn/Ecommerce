from django.db import models

# Create your models here.
from django.db import models
from django_resized import ResizedImageField
import os 

def rename_user_photo(instance, file_name):
    ext = file_name.split(".")[-1]
    new_fname = f"{instance.uid}.{ext}"
    return os.path.join("user_photos/", new_fname)

class Users(models.Model):
    uid=models.AutoField(primary_key=True)
    utype=models.CharField(max_length=10,null=False)
    cname=models.CharField(max_length=100,default='N/A')
    caddr=models.TextField(null=True,blank=True,default='N/A')
    uname=models.CharField(max_length=200,null=False)
    email=models.EmailField(max_length=200,unique=True,null=False)
    ph_no=models.BigIntegerField(unique=True,null=False)
    passkey=models.CharField(max_length=50,null=False)
    location=models.CharField(max_length=50,default='N/A')
    addr=models.TextField(default='N/A',null=True,blank=True)
    photo=ResizedImageField(
        size = [500, 500],
        upload_to = rename_user_photo,
        force_format = "PNG"
    )
