from django.db import models

class GroupePfe(models.Model):
    class TypeGroupe(models.TextChoices):
        MONOME = 'MONOME', 'Monôme'
        BINOME = 'BINOME', 'Binôme'

    id_groupe = models.AutoField(primary_key=True)
    nom_groupe = models.CharField(max_length=50)
    type_groupe = models.CharField(max_length=6, choices=TypeGroupe.choices, default=TypeGroupe.MONOME)
    date_creation = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.nom_groupe
