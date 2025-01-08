""" from rest_framework import permissions

class IsProfessorOfModule(permissions.BasePermission):

    Custom permission to allow only professors to manage marks for the modules they teach.


    def has_object_permission(self, request, view, obj):
        return obj.element.professeur.user == request.user
 """
""" 
from rest_framework import permissions
from .models import Professeur

class IsProfesseur(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a Professeur
        return Professeur.objects.filter(user=request.user).exists() """