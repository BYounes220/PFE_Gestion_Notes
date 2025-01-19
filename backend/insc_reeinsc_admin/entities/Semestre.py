from django.db import models
from insc_reeinsc_admin.entities.Filiere import Filiere

class Semestre(models.Model):
    id_semestre = models.AutoField(primary_key=True, verbose_name="ID du semestre")    
    nom_semestre = models.CharField(max_length=10, verbose_name="Nom du semestre")
    nombre_modules = models.PositiveIntegerField(verbose_name="Nombre de modules", default=0)
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.CASCADE,
        related_name='semestres_filiere',  
        verbose_name="Filière du semestre",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nom_semestre

    class Meta:
        verbose_name = "Semestre"
        verbose_name_plural = "Semestres"
        ordering = ['nom_semestre']