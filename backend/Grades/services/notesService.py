from Grades.Models.evaluation import Evaluation
from Grades.Models.element import Element
from Grades.Models.etudiant import Etudiant
from Grades.serializers.evaluationSerializer import evaluationSerializer
class NoteService:

    @staticmethod
    def alter(request):
        request=request.data
        element=None
        etudiant=None
        try:
            evaluation = Evaluation.objects.get(etudiant=request.get('etudiant'),element=request.get('element'))
        except Evaluation.DoesNotExist:
            evaluation = Evaluation()

        try:
            element = Element.objects.get(id=request.get('element'))
        except Element.DoesNotExist:
             error="element does not exist"
             return error
        try:
            etudiant= Etudiant.objects.get(cne=request.get('etudiant'))
        except Etudiant.DoesNotExist:
             error="student does not exist"
             return error
        
        #and element!=None and etudiant!=None
        
        evaluation.note_ordinaire=request.get('note_ordinaire')
        evaluation.note_rattrapage=request.get('note_rattrapage')
        evaluation.annee=request.get('annee')
        evaluation.etudiant=Etudiant.objects.filter(cne=request.get('etudiant')).first()
        evaluation.element=Element.objects.filter(id=request.get('element')).first()
        evaluation.save()

        return True

    @staticmethod
    def search(request):
        if(request.data.get("parametre")=="cne"):
            try:
                evaluation=Evaluation.objects.get(etudiant=request.data.get("value"))
                serializer = evaluationSerializer(evaluation)
                return serializer
            except Evaluation.DoesNotExist:
                return None
        else:
            return None
        
