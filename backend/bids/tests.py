from rest_framework.test import APITestCase, APIClient
from products.models import Product
from bids.models import Bid
from accounts.models import Buyer, Seller
from rest_framework import status
from bids.serializers import BidSerializers
from django.contrib.auth.models import User
import datetime

client = APIClient()

class BidAPI(APITestCase):
    """
    TEST CASES FOR BID API
    """
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="TestUser",
            email='test@test.com',
            password="TestPassword",
        )
        self.user_2 = User.objects.create_superuser(
            username='seller123',
            email='seller@seller.com',
            password='seller123password'
        )
        self.seller = Seller.objects.create(user=self.user_2)
        self.buyer = Buyer.objects.create(user=self.user)
        self.product = Product.objects.create(
            user = self.seller,
            name='Product B',
            description='Product B is B',
            minimum_bid=50,
            maximum_bid=1000,
            expiry_date=datetime.datetime.now(),
            status='OPEN')
        self.bid = Bid.objects.create(
            buyer=self.buyer,
            amount=1000,
            product=self.product
        )
    
    def test_bid_list_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            '/api/bids/'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_bids_retrieve_success(self):
        self.client.force_authenticate(self.user)
        respose = self.client.get(
            '/api/bids/'
        )

    def test_bid_create_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            '/api/bids/', 
            {
                'buyer': 1,
                'amount': 500,
                'product': 1
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_bid_destroy_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            '/api/bids/1/',
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)