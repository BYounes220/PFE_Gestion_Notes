from rest_framework import serializers
from Grades.models import Element, Evaluation, Professeur, Etudiant


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = [
            'id',
            'description',
            'volums_horaire',
            'type_element',
            'coiefficient',
            'note_credit',
            'Professeur'
        ]


class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = ['id', 'nom_etudiant', 'prenom_etudiant']  # Include 'id' for compatibility


class EvaluationsSerializer(serializers.ModelSerializer):
    id_etudiant = serializers.PrimaryKeyRelatedField(queryset=Etudiant.objects.all())
    id_element = serializers.PrimaryKeyRelatedField(queryset=Element.objects.all())
    element_description = serializers.CharField(source='id_element.description', read_only=True)
    full_name_etudiant = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = [
            'id',
            'note_ordinaire',
            'note_rattrapage',
            'annee',
            'etudiant',  
            'element',
            'full_name_etudiant',  
            'element_description',
        ]

    def get_full_name_etudiant(self, obj):
        return f"{obj.id_etudiant.prenom_etudiant} {obj.id_etudiant.nom_etudiant}"
    

class ProfesseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professeur
        fields = [
            'id',
            'user',
            'cin',
            'nom_professeur',
            'prenom_professeur',
            'email_professeur',
            'num_telephone',
            'fonction'
        ]

    def create(self, validated_data):
        professeur = Professeur.objects.create(**validated_data)
        return professeur
