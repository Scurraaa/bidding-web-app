from rest_framework.test import APITestCase, APIClient
from products.models import Product
from accounts.models import Seller
from rest_framework import status
from products.serializers import ProductSerializers
from django.contrib.auth.models import User
import datetime

client = APIClient()

class ProductAPI(APITestCase):
    """
    TESTCASES FOR PRODUCT API
    """
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="TestUser",
            email='test@test.com',
            password="TestPassword",
        )
        self.seller = Seller.objects.create(user=self.user)
        self.product = Product.objects.create(
            user = self.seller,
            name='Product B',
            description='Product B is B',
            minimum_bid=50,
            maximum_bid=1000,
            expiry_date=datetime.datetime.now(),
            status='OPEN'
        )
    
    def test_product_list_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            '/api/products/'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_product_retrieve_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            '/api/products/1/'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_product_create_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            '/api/products/', 
            {
                "user": 1,
                "name": "Product C",
                "description": "Product C is C",
                "minimum_bid": 50,
                "maximum_bid": 60,
                "expiry_date": datetime.datetime.now(),
                'status': 'OPEN'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_product_update_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            '/api/products/1/',
            {
                'user': 1,
                'name': 'Product C',
                'description': 'Product C is C',
                'minimum_bid': 50,
                'maximum_bid': 1000,
                'expiry_date':datetime.datetime.now(),
                'status': 'CLOSED'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_product_delete_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            '/api/products/1/'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        

