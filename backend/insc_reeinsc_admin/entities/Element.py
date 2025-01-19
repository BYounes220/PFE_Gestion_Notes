from django.db import models
from insc_reeinsc_admin.entities.Module import Module

class Element(models.Model):
    nom_element = models.CharField(primary_key=True, max_length=10, verbose_name="Nom d'element")
    heure_tp = models.CharField(max_length=10, verbose_name="Heure tp d'element", blank=True)
    heure_td = models.CharField(max_length=10, verbose_name="Heure td d'element", blank=True)
    heure_cours = models.CharField(max_length=10, verbose_name="Heure cours d'element", blank=True)
    penderation_element = models.CharField(max_length=10, verbose_name="Penderation d'element", blank=True)
    module_elm = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        verbose_name="Module",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nom_element

    class Meta:
        verbose_name = "Element"
        verbose_name_plural = "Elements"
        ordering = ['nom_element']