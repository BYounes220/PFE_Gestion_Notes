from django.urls import path,include
from .views.test import index

urlpatterns = [
    path('test/', view=index, name='test'),
]
