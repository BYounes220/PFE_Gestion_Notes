from django.db import models
from insc_reeinsc_admin.entities.Etudiant import Etudiant


class Demande(models.Model):

    class Choix(models.TextChoices):
        ACCEPTER = 'Accepter','accepter'
        REFUSER = 'Refuser','refuser'
        ENATTENTE = 'en_attente','en attente'
    
    id_demande = models.AutoField(primary_key=True)
    id_demandeur = models.ForeignKey(Etudiant, on_delete=models.CASCADE, related_name='demande_etudiant_demendeur')
    id_recepteur = models.ForeignKey(Etudiant, on_delete=models.CASCADE, related_name='damande_etudiant_recepteur')
    date_demande = models.DateField(auto_now_add=True)
    etat_demande = models.CharField(max_length=10, choices=Choix.choices, default=Choix.ENATTENTE)