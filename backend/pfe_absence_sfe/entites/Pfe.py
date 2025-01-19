from django.db import models
from insc_reeinsc_admin.entities.Professeur import Professeur
from pfe_absence_sfe.entites.GroupePfe import GroupePfe

class Pfe(models.Model):
    id_pfe = models.AutoField(primary_key=True)
    sujet = models.CharField(max_length=100)
    encadrant = models.ForeignKey(Professeur, on_delete=models.PROTECT, related_name='pfe_professeur')
    groupe = models.OneToOneField(GroupePfe, on_delete=models.CASCADE, related_name='groupes_pfe')