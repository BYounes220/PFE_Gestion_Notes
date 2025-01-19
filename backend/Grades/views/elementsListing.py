from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Grades.models import Element
from Grades.Serializers.elementSerializer import ElementSerializer

class ElementsListing(APIView):
    permission_classes= [IsAuthenticated]
    def get(self,request):
        user = request.user
        professeurElements= Element.objects.filter(professeur__id_professeur= user.user_id)
        if(professeurElements.count()==0): return Response({"error":"the professor has no elements or does not exist"})
        serialisedElements=ElementSerializer(professeurElements,many=True)
        return Response(serialisedElements.data)
