from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from products.models import Product 
from bids.models import Bid
from .serializers import LoginSerializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from accounts.models import Buyer, Seller
import datetime

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny,])
def logging_in(request):
    if request.method == 'POST':
        serializer = LoginSerializers(data=request.data)
        if not serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                if not created:
                    token.created = datetime.datetime.now(datetime.timezone.utc)
                    token.save()
                    if user.is_superuser:
                        seller = Seller.objects.get(user=user)
                        products = Product.objects.filter(user=seller)
                        min_bid_sum = sum([product.minimum_bid for product in products])
                        max_bid_sum = sum([product.maximum_bid for product in products])
                        average = min_bid_sum + max_bid_sum / products.count()
                        response_data = {
                            'id': user.id,
                            'token': token.key,
                            'username': username,
                            'products': Product.objects.filter(user=seller).count(),
                            'ongoing_products': Product.objects.filter(status='OPEN', user=seller).count(),
                            'done_products': Product.objects.filter(status='CLOSED', user=seller).count(),
                            'earnings': seller.earnings,
                            'potential_earnings': average,
                            'detail': 'Successfully logged in',
                        }
                        return Response(response_data, status=status.HTTP_200_OK)
                    else : 
                        buyer = Buyer.objects.get(user=user)
                        response_data = {
                            'id': user.id,
                            'token': token.key,
                            'username': username,
                            'bid_credits': buyer.bid_credit,
                            'total_bids': Bid.objects.filter(buyer=buyer).count(),
                            'winning_bids': buyer.winning_bids,
                            'commited_bids': buyer.commited_bids,
                            'total_spent': buyer.commited_bids,
                        }
                    return Response(response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    'id': None,
                    'token': None,
                    'username': None,
                    'password': None,
                    'superuser': None,
                    'detail': 'Invalid login credentials',
                }
                return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        else:
            response_data = {
            'id': None,
            'token': None,
            'username': None,
            'password': None,
            'superuser': None,
            'detail': 'Login credentials doesn\'t exists',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    response_data = {
        'id': None,
        'token': None,
        'username': None,
        'password': None,
        'superuser': None,
        'detail': 'Method not allowed',
    }
    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny,])
def logging_out(request):
    if request.method == 'POST':
        serializer = LoginSerializers(data=request.data)
        if not serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                logout(request)
                if Token.objects.filter(user=user).exists():
                    existing_token = Token.objects.get(user=user)
                    existing_token.delete()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny,])
def signing_up(request):
    if request.method == 'POST':
        if request.data is not None:
            username = request.data['username']
            password = request.data['password']
            email = request.data['username']
            user_type = request.data['user_type']
            if not User.objects.filter(username=username).exists():
                if(user_type == 'seller'):
                    user = User.objects.create_superuser(username, email, password)
                    user.save()
                    seller = Seller.objects.create(user=user)
                    seller.save()
                    data  = {
                        'detail': 'Successfully Added a New Seller'
                    }
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    user = User.objects.create_user(username, email, password)
                    user.save()
                    buyer = Buyer.objects.create(user=user)
                    buyer.save()
                    data  = {
                        'detail': 'Successfully Added a New Buyer'
                    }
                    return Response(data, status=status.HTTP_200_OK)
            return Response({'detail': 'User Already Exists'},status=status.HTTP_400_BAD_REQUEST)

