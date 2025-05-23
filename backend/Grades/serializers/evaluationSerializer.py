from rest_framework import serializers
from Grades.entities.evaluation import Evaluation

class EvaluationsSerializer(serializers.ModelSerializer):
    #id_etudiant = serializers.PrimaryKeyRelatedField(queryset=Etudiant.objects.all())
    #id_element = serializers.PrimaryKeyRelatedField(queryset=Element.objects.all())
    nom_element = serializers.CharField(source='element.nom_element', read_only=True)
    full_name_etudiant = serializers.SerializerMethodField()
    cne_etudiant = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = [
            'id',
            'note_ordinaire',
            'note_rattrapage',
            'annee_academique',
            'etudiant',
            'element',
            'full_name_etudiant',
            'nom_element',
            'cne_etudiant',
        ]
        extra_kwargs  = {
            'annee_academique' : {'read_only' : True},
            'etudiant' : {'read_only':True},
            'element' : {'read_only':True},
        }

    def get_full_name_etudiant(self, obj):
        return f"{obj.etudiant.prenom_std} {obj.etudiant.nom_std}"
    def get_cne_etudiant(self, obj):
        return obj.etudiant.cne_std 