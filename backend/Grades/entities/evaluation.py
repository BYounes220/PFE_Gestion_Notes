from django.db import models
from insc_reeinsc_admin.entities.Element import Element
from insc_reeinsc_admin.entities.Etudiant import Etudiant

class Evaluation(models.Model):
    note_ordinaire = models.DecimalField(max_digits=5, decimal_places=2)
    note_rattrapage = models.DecimalField(max_digits=5, decimal_places=2 , null = True)
    annee_academique = models.CharField(max_length=12)
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('element', 'etudiant', 'annee_academique')
    
    def get_cne_etudiant(self, obj):
        return obj.etudiant.cne_std

    def __str__(self):
        return f"{self.id_etudiant} - {self.id_element} ({self.annee})"