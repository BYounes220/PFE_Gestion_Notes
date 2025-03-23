from rest_framework import views 
from insc_reeinsc_admin.entities.Etudiant import Etudiant
from insc_reeinsc_admin.entities.Semestre import Semestre
from insc_reeinsc_admin.entities.Module import Module
from insc_reeinsc_admin.entities.Element import Element
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from Grades.serializers.semesterSerializer import SemesterSerialiazer
from Grades.serializers.moduleSerializer import ModuleSerializer
from Grades.entities.evaluation import Evaluation
from decimal import Decimal


class ListSemesters(views.APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        try:
            correspondent_std = Etudiant.objects.get(cne_std=user.user_id)
            semesters = Semestre.objects.filter(filiere=correspondent_std.filiere_std)
            SerialisedSemesters = SemesterSerialiazer(semesters,many=True)
            return Response(SerialisedSemesters.data)
        
        except ObjectDoesNotExist:
            print("the student or semesters does not exist")
        except Exception as e:
            print("an error occured in fetching the student or the semester")
        return Response(200)

class SemesterGrades(views.APIView):
    permission_classes= [IsAuthenticated]
    def post(self,request):
        user = request.user
        student = Etudiant.objects.get(cne_std=user.user_id)
        pickedSemester = Semestre.objects.get(id_semestre=request.data.get("id_semestre"))
        models = Module.objects.filter(semestre_mod=pickedSemester)
        serialisedModels = []
        for m in models:
            if(m.nombre_element==1):
                try:
                    element = Element.objects.get(module_elm=m)
                    evaluation = Evaluation.objects.get(element=element,etudiant=student)
                    if(evaluation.note_ordinaire>=12):
                        serializedModel = ModuleSerializer(m,context={"note":evaluation.note_ordinaire})
                    else:
                        serializedModel = ModuleSerializer(m,context={"note":evaluation.note_rattrapage})
                    serialisedModels.append(serializedModel.data)
                except Evaluation.DoesNotExist:
                    serializedModel = ModuleSerializer(m,context={"note":"NaN"})
                    serialisedModels.append(serializedModel.data)
            else:
                elements = Element.objects.filter(module_elm=m)
                note=0
                err=False
                for e in elements:
                    try:
                        evaluation = Evaluation.objects.get(element=e,etudiant=student)
                        if(evaluation.note_ordinaire>=12):
                            note = note + evaluation.note_ordinaire*Decimal(e.penderation_element)
                        else:
                            note = note + evaluation.note_rattrapage*Decimal(e.penderation_element)
                    except Evaluation.DoesNotExist:
                       serializedModel = ModuleSerializer(m,context={"note":"NaN"})
                       serialisedModels.append(serializedModel.data)
                       err=True
                       break
                if err==True:
                    continue
                serializedModel = ModuleSerializer(m,context={"note":note})
                serialisedModels.append(serializedModel.data)
        return Response(serialisedModels)
        