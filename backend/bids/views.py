from rest_framework import viewsets, status
from bids.models import Bid
from products.models import Product
from accounts.models import Buyer
from django.contrib.auth.models import User
from bids.serializers import BidSerializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import Http404

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializers
    permission_classes =[IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def list(self, request, *args, **kwargs):
        buyer_id = self.request.GET.get('buyer', None)
        bid_status = self.request.GET.get('status', None)
        if bid_status:
            queryset=Bid.objects.filter(buyer=buyer_id, status=bid_status)
        else:
            queryset=Bid.objects.filter(buyer=buyer_id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = BidSerializers(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = BidSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = Product.objects.get(
            pk=serializer.validated_data.get('product')
        )
        if product.minimum_bid <= serializer.validated_data.get('amount') and product.maximum_bid >= serializer.validated_data.get('amount'):
            user = User.objects.get(username=serializer.validated_data.get('buyer'))
            buyer = Buyer.objects.get(user=user)
            buyer.bid_credit -= serializer.validated_data.get('amount')
            buyer.commited_bids += serializer.validated_data.get('amount')
            serializer.save()
            buyer.save()
            data = {
                'detail': 'Successfully Added a New Bid'
            }
            return Response(data, status=status.HTTP_201_CREATED)
        data = {
            'detail': 'Amount Bid overlaps with minimum and maximum bid'
        }
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
        data = {
            'detail': 'Successfully Added a new Product!'
        }
        return Response(data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            user = User.objects.get(username=instance.buyer)
            buyer = Buyer.objects.get(user=user)
            buyer.bid_credit += instance.amount
            buyer.commited_bids -= instance.amount
            self.perform_destroy(instance)
            buyer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)


