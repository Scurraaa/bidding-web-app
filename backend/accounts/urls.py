from django.urls import path
from accounts import views

urlpatterns = [
    path('login', views.logging_in),
    path('logout', views.logging_out),
    path('signup', views.signing_up)
]