from rest_framework import serializers
from Grades.Models.evaluation import Evaluation
class evaluationSerializer(serializers.ModelSerializer):
    #the class below provide meta data about the model to be serialised
    class Meta:
        model=Evaluation
        #this enable us to get the the name of the fields of a model
        fields = ['note_ordinaire','note_rattrapage','annee','element','etudiant']