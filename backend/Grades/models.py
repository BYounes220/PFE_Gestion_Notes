from django.db import models
# Create your models here.

class Etudiant(models.Model):
    class GenreChoices(models.TextChoices):
        HOMME = 'H', 'Homme'
        FEMME = 'F', 'Femme'

    cne = models.CharField(primary_key=True,max_length=10, unique=True)
    cin = models.CharField(max_length=8, unique=True)
    nom_etudiant = models.CharField(max_length=20)
    prenom_etudiant = models.CharField(max_length=20)
    date_naissance = models.DateField()
    lieu_naissance = models.CharField(max_length=20)
    adress = models.CharField(max_length=50)
    genre = models.CharField(max_length=1, choices=GenreChoices.choices)
    telephone = models.CharField(max_length=10)
    email_acadymic = models.EmailField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.nom_etudiant} {self.prenom_etudiant}" 
    


class Professeur(models.Model):
    id_professeur = models.CharField(primary_key=True,max_length=30)
    cin = models.CharField(max_length=7, unique=True)
    nom_professeur = models.CharField(max_length=20, default='')
    prenom_professeur = models.CharField(max_length=20, default='')
    email_professeur = models.EmailField(max_length=50, unique=True, default='')
    num_telephone = models.CharField(max_length=10)
    fonction = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.prenom_professeur} {self.nom_professeur}'
   


class Element(models.Model):
    nom_element = models.CharField(max_length=50)
    description = models.CharField(max_length=200, unique=True)
    volums_horaire = models.IntegerField()
    type_element = models.CharField(max_length=20)
    coiefficient = models.FloatField(default=1)
    note_credit = models.IntegerField()
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)

    def __str__(self):
        return self.description
   


class Evaluation(models.Model):
    note_ordinaire = models.DecimalField(max_digits=5, decimal_places=2)
    note_rattrapage = models.DecimalField(max_digits=5, decimal_places=2,null=True)
    annee_academique = models.CharField(max_length=12)
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('element', 'etudiant', 'annee_academique')

    def __str__(self):
        return f"{self.id_etudiant} - {self.id_element} ({self.annee})"