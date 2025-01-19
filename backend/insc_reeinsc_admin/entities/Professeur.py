from django.db import models


class Professeur(models.Model):
    image_prof = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    cin_prof = models.CharField(primary_key=True, max_length=20, verbose_name="CIN du professeur")
    nom_prof = models.CharField(max_length=50, verbose_name="Nom du professeur")
    prenom_prof = models.CharField(max_length=50, verbose_name="Prenom du professeur", blank=True)
    adrs_prof = models.CharField(max_length=100, verbose_name="Addresse du professeur", blank=True)
    email_prof = models.EmailField(max_length=100, verbose_name="Email du professeur", unique=True)
    num_tele_prof = models.CharField(max_length=15, verbose_name="Numéro de téléphone", unique=True)
    degre_prof = models.CharField(max_length=100, blank=True, null=True)
    fonction_prof = models.CharField(max_length=50, verbose_name="Fonction du professeur", default="Enseignant")

    def __str__(self):
        return f"{self.nom_prof} {self.prenom_prof}"

    def add_coordonateur_function(self, role):
        if role not in self.fonction_prof:
            if self.fonction_prof == "Enseignant":
                self.fonction_prof = f"Enseignant, {role}"
            else:
                self.fonction_prof += f", {role}"
            self.save()
            
    def remove_coordonateur_function(self, role):
        if role in self.fonction_prof:
            fonctions = self.fonction_prof.split(", ")
            fonctions = [f for f in fonctions if f != role]
            self.fonction_prof = ", ".join(fonctions)
            self.save()

    class Meta:
        verbose_name = "Professeur"
        verbose_name_plural = "Professeurs"
        ordering = ['nom_prof']