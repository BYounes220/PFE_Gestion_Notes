from django.db import models
from insc_reeinsc_admin.entities.Filiere import Filiere
from pfe_absence_sfe.entites.GroupePfe import GroupePfe

class Etudiant(models.Model):
    class AnneeEtude(models.TextChoices):
        PREMIERE = '1', 'Première Année'
        DEUXIEME = '2', 'Deuxième Année'
        TROISIEME = '3', 'Troisième Année'
        QUATRIEME = '4', 'Quatrième Année'
        CINQUIEME = '5', 'Cinquième Année'
    
    image_std = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    cin_std = models.CharField(primary_key=True, max_length=20, verbose_name="CIN d'etudiant")
    cne_std = models.CharField(max_length=20, verbose_name="CNE d'etudiant")
    nom_std = models.CharField(max_length=50, verbose_name="Nom d'etudiant")
    prenom_std = models.CharField(max_length=50, verbose_name="Prenom d'etudiant", blank=True)
    date_naiss = models.DateField(verbose_name="Date de naissance", blank=True)
    
    nationalite_std = models.CharField(max_length=50, verbose_name="Nationalite d'etudiant", blank=True)
    pays_std = models.CharField(max_length=50, verbose_name="Pays d'etudiant", blank=True)
    region = models.CharField(max_length=50, verbose_name="Region", blank=True)
    addresse_postal = models.CharField(max_length=100, verbose_name="Addresse postal", blank=True)
    code_postal = models.CharField(max_length=50, verbose_name="Code postal", blank=True)
    ville_std = models.CharField(max_length=50, verbose_name="Ville d'etudiant", blank=True)    
    adrs_std = models.CharField(max_length=100, verbose_name="Addresse d'etudiant", blank=True)

    annee_etude = models.CharField(max_length=50, choices=AnneeEtude.choices, default=AnneeEtude.PREMIERE)
    serie_bac = models.CharField(max_length=50, verbose_name="Série du baccalauréat", blank=True)
    annee_obtention_bac = models.CharField(max_length=50, verbose_name="Année d'obtention du baccalauréat", blank=True)
    mention_bac = models.CharField(max_length=50, verbose_name="Mention au baccalauréat", blank=True)
    etablissement_origine = models.CharField(max_length=50, verbose_name="Établissement d'origine", blank=True)

    num_tele_std = models.CharField(max_length=15, verbose_name="Numéro de téléphone", unique=True)
    email_std = models.EmailField(max_length=100, verbose_name="Email Personnel d'etudiant", unique=True)
    password_std = models.CharField(max_length=100, verbose_name="Password Personnel d'etudiant", unique=True)
    
    filiere_std = models.ForeignKey(
        Filiere,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="filiere_etudiant",
        verbose_name="La Filiere d'etudiant",
    )   
    groupe_std = models.ForeignKey(
        GroupePfe,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="groupe_etudiant",
        verbose_name="Le Groupe d'etudiant",
    )

    def __str__(self):
        return f"{self.nom_std} {self.prenom_std}"

    class Meta:
        verbose_name = "Etudiant"
        verbose_name_plural = "Etudiants"
        ordering = ['nom_std']