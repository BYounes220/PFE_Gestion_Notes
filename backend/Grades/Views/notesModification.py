from rest_framework.views import APIView
from Grades.services.notesService import NoteService
from django.http import JsonResponse


class NotesModification(APIView):

    def post(self,request):
        result=NoteService.alter(request=request)
        if(result!=True):
            return JsonResponse({"operation-status" : "error","message":"element ou etudiant non trouvee"})
        return JsonResponse({"operation-status" : "success","message":"evaluation modifiee (ajoutée)"})
