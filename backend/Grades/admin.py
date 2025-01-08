""" from django.contrib import admin
from .models import Evaluation, Etudiant, Professeur


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ('prenom_etudiant', 'nom_etudiant', 'note_ordinaire', 'note_rattrapage', 'annee', 'id_element')
    search_fields = ('etudiant__prenom_etudiant', 'etudiant__nom_etudiant', 'element__description', 'annee')
    list_filter = ('annee',)

    def prenom_etudiant(self, obj):
        return obj.id_etudiant.prenom_etudiant  
    prenom_etudiant.short_description = 'Prénom'

    def nom_etudiant(self, obj):
        return obj.id_etudiant.nom_etudiant  
    nom_etudiant.short_description = 'Nom'
    


@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('prenom_etudiant', 'nom_etudiant', 'cne', 'cin', 'email_acadymic')
    search_fields = ('prenom_etudiant', 'nom_etudiant', 'cne', 'cin', 'email_acadymic')
    list_filter = ('genre', 'date_naissance')

    def prenom_etudiant(self, obj):
        return obj.prenom_etudiant
    
    def nom_etudiant(self, obj):
        return obj.nom_etudiant


@admin.register(Professeur)
class ProfesseurAdmin(admin.ModelAdmin):
    list_display = ('nom_professeur', 'prenom_professeur')

    def first_name(self, obj):
        return obj.user.prenom_professeur
    first_name.short_description = 'Prénom'

    def last_name(self, obj):
        return obj.user.nom_professeur
    last_name.short_description = 'Nom'
 """