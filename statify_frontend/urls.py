from django.shortcuts import redirect, render
from django.urls import path
from statify_frontend.views import index

app_name = 'frontend'

urlpatterns = [
    path('home/', index, name='home'),
    path('', lambda req:redirect('frontend:home'))
]