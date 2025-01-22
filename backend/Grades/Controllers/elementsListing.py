from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from insc_reeinsc_admin.entities.Element import Element
from Grades.serializers.elementSerializer import ElementSerializer
from Grades.entities.enseignement import Enseignement

class ElementsListing(APIView):
    permission_classes= [IsAuthenticated]
    def get(self,request):
        user = request.user
        professeurElements= Enseignement.objects.filter(professeur__email_prof= user.user_id)
        if(professeurElements.count()==0): return Response({"error":"the professor has no elements or does not exist"},status=404)
        elements = [enseignement.element for enseignement in professeurElements]
        serialisedElements=ElementSerializer(elements,many=True)
        return Response(serialisedElements.data)
