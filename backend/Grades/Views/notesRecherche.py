from rest_framework.views import APIView
from Grades.services.notesService import NoteService
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class NotesRecherche(APIView):
    permission_classes= [IsAuthenticated]
    def post(self,request):
        result=NoteService.search(request=request)
        if(result is None):
            return Response({"error":"student does not exist"},status=404)
        return Response(result.data)