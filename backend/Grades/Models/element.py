from django.db import models
from .professeur import Professeur

class Element(models.Model):
    nom_element = models.CharField(max_length=50)
    credit = models.IntegerField()
    penderation = models.DecimalField(max_digits=4,decimal_places=3,default=1)
    type = models.CharField(max_length=20,blank=False)
    professeur = models.ForeignKey(Professeur,on_delete=models.CASCADE)