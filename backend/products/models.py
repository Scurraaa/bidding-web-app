from django.db import models
from accounts.models import Seller, Buyer
from gdstorage.storage import GoogleDriveStorage, GoogleDrivePermissionType, GoogleDrivePermissionRole, GoogleDriveFilePermission

gd_storage = GoogleDriveStorage()

permission = GoogleDriveFilePermission(
    GoogleDrivePermissionRole.READER,
    GoogleDrivePermissionType.USER,
    'joshua.bacani12@gmail.com'
)


PRODUCT_STATUS_CHOICES = [
    ('CLOSED', 'CLOSED'),
    ('OPEN', 'OPEN')
]

class Product(models.Model):
    user = models.ForeignKey(Seller, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    minimum_bid = models.FloatField()
    maximum_bid = models.FloatField()
    expiry_date = models.DateTimeField()
    status = models.CharField(max_length=255, choices=PRODUCT_STATUS_CHOICES, default='OPEN')
    image = models.ImageField(upload_to='product_images', storage=gd_storage, null=True, blank=True)
    winner = models.ForeignKey(Buyer, on_delete=models.CASCADE, null=True, blank=True)

    def __int__(self):
        return self.id

