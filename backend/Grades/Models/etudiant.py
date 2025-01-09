from django.db import models

class Etudiant(models.Model):
    cne = models.CharField(primary_key=True,max_length=30)
    prenom = models.CharField(max_length=30)
    nom = models.CharField(max_length=30,blank=False)
    cin = models.CharField(max_length=10,blank=False)
    email = models.CharField(max_length=20)
    date_naissance = models.CharField(max_length=20,blank=False)
    telephone = models.CharField(max_length=15,blank=False)
    adresse = models.CharField(max_length=150,blank=False)
    nationalite = models.CharField(max_length=20,blank=False)

    