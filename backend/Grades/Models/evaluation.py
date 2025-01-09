from django.db import models
from .element import Element
from .etudiant import Etudiant

class Evaluation(models.Model):
    note_ordinaire = models.DecimalField(db_column="OrdinaryMark",max_digits=5,decimal_places=3)
    note_rattrapage = models.DecimalField(db_column="CatchUpMark",max_digits=5,decimal_places=3,null=True,blank=True)
    annee = models.IntegerField(blank=False)
    element = models.ForeignKey(Element,on_delete=models.CASCADE,db_column="element")
    etudiant = models.ForeignKey(Etudiant,on_delete=models.CASCADE,db_column="etudiant")

    
 