from rest_framework import viewsets, status
from products.models import Product
from bids.models import Bid
from accounts.models import Buyer, Seller
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from products.serializers import ProductSerializers
from bids.serializers import BidSerializers
from rest_framework.decorators import action

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    permission_classes =[IsAuthenticated]
    http_method_names = ['get', 'post', 'patch', 'delete']

    @action(detail=False, methods=['POST'], name='Select Winning Bid')
    def select(self, request, *args, **kwargs):
        if request.method == 'POST':
            product_id = self.request.GET.get('product', None)
            bid_id = request.data['bid_id']
            winning_bid = Bid.objects.get(id=bid_id)
            user = User.objects.get(username=winning_bid.buyer)
            buyer = Buyer.objects.get(user=user)
            buyer.winning_bids += 1
            buyer.save()
            if(Bid.objects.filter(product=product_id).exists()):
                bids = Bid.objects.filter(product=product_id)
                for bid in bids:
                    if bid.id == bid_id:
                        bid.status = 'SUCCESSFUL'
                    else:
                        bid.status = 'UNSUCCESSFUL'
                    bid.save()

                product = Product.objects.get(id=product_id)
                product.status = 'CLOSED'
                product.winner = buyer
                product.save()
                seller = Seller.objects.get(pk=product.user.id)
                seller.earnings += winning_bid.amount
                seller.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=['GET'], name='Get Bids')
    def bids(self, request, *args, **kwargs):
        product = self.request.GET.get('product', None)
        bids = Bid.objects.filter(product=product)
        page = self.paginate_queryset(bids)
        if page is not None:
            serializer = BidSerializers(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = BidSerializers(bids, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductSerializers(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ProductSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer =self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            'detail': 'Successfully Added a new Product!'
        }
        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            'detail': 'Successfully Updated a Product'
        }
        return Response(data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            data = {
                'detail': 'Successfully Deleted'
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)