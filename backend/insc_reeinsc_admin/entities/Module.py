from django.db import models
from insc_reeinsc_admin.entities.Semestre import Semestre
from insc_reeinsc_admin.entities.Professeur import Professeur

class Module(models.Model):
    nom_module = models.CharField(primary_key=True, max_length=10, verbose_name="Nom du module")
    charge_horaire = models.CharField(max_length=10, verbose_name="Charge d'horaire du module", blank=True)
    coef_module = models.CharField(max_length=10, verbose_name="Coefecient du module", blank=True)
    coord_module = models.ForeignKey(
        Professeur,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="coordonateur_module",
        verbose_name="Coordonateur du module",
    )
    nombre_element = models.PositiveIntegerField(verbose_name="Nombre d'éléments", default=0)
    semestre_mod = models.ForeignKey(
        Semestre,
        on_delete=models.CASCADE,
        related_name='semestre_modules',  
        verbose_name="Semestre de modeles",
        null=True,
        blank=True  
    )

    def __str__(self):
        return self.nom_module

    def save(self, *args, **kwargs):
        if self.coord_module:
            self.coord_module.add_coordonateur_function("Coordonateur d'un Module")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.coord_module:
            self.coord_module.remove_coordonateur_function("Coordonateur d'un Module")
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Module"
        verbose_name_plural = "Modules"
        ordering = ['nom_module']
