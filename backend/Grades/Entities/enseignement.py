from insc_reeinsc_admin.entities.Professeur import Professeur
from insc_reeinsc_admin.entities.Element import Element
from django.db import models

class Enseignement(models.Model):
    id_enseignement = models.CharField(primary_key=True)  
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE, related_name="enseignements")
    element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="enseignements")

    def __str__(self):
        return f"{self.professeur.nom_prof} {self.professeur.prenom_prof} teaches {self.element.nom_element}"
