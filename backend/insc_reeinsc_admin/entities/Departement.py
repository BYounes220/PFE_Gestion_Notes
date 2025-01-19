from django.db import models
from insc_reeinsc_admin.entities.Professeur import Professeur

class Departement(models.Model):
    id_dept = models.AutoField(primary_key=True)
    nom_departement = models.CharField(max_length=255, verbose_name="Nom du département", unique=True)
    coordonateur_dept = models.ForeignKey(
        Professeur,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="coordonateur_departements",
        verbose_name="Coordonateur du département",
    )

    def __str__(self):
        return self.nom_departement

    def save(self, *args, **kwargs):
        if self.coordonateur_dept:
            self.coordonateur_dept.add_coordonateur_function("Coordonateur d'un Département")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.coordonateur_dept:
            self.coordonateur_dept.remove_coordonateur_function("Coordonateur d'un Département")
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Département"
        verbose_name_plural = "Départements"
        ordering = ['nom_departement']
        