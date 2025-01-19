from django.db import models
from insc_reeinsc_admin.entities.Professeur import Professeur
from insc_reeinsc_admin.entities.Departement import Departement


class Filiere(models.Model):
    nom_filiere = models.CharField(primary_key=True, max_length=50, verbose_name="Nom du filiere")
    dept_filiere = models.ForeignKey(
        Departement,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="dept_filiere",
        verbose_name="Departement du filiere",
    )
    coord_filiere = models.ForeignKey(
        Professeur,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="coordonateur_filiere",
        verbose_name="Coordonateur du filiere",
    )
    equipe_pydagogique = models.ForeignKey(
        Professeur,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="equipe_pydagogique_filiere",
        verbose_name="Equipe pydagogique du filiere",
    )
    type_diplome = models.CharField(max_length=20, verbose_name="Type de diplome du filiere")
    semestres = models.CharField(max_length=20, verbose_name="Semestres du filiere")

    def __str__(self):
        return self.nom_filiere

    def save(self, *args, **kwargs):
        if self.coord_filiere:
            self.coord_filiere.add_coordonateur_function("Coordonateur d'une Filière")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.coord_filiere:
            self.coord_filiere.remove_coordonateur_function("Coordonateur d'une Filière")
        super().delete(*args, **kwargs)

    class Meta:
        verbose_name = "Filiere"
        verbose_name_plural = "Filieres"
        ordering = ['nom_filiere']