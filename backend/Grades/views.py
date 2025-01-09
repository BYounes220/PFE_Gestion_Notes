

from django.http import HttpResponse

# Example view: Homepage of the Grades app
def index(request):
    return HttpResponse("Welcome to the Grades app!")


from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import generics
from .models import Professeur, Evaluation
from rest_framework.views import APIView
from rest_framework.response import Response  
from .serializers import ProfesseurSerializer, EvaluationsSerializer

class ProfesseurViewSet(generics.CreateAPIView):
    queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer


class EvaluationListCreateView(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationsSerializer


class EvaluationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationsSerializer

class EvaluationsAPIView(APIView):
    def get(self, request):
        evaluations = Evaluation.objects.all()
        serializer = EvaluationsSerializer(evaluations, many=True)
        return Response(serializer.data)
    
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Evaluation
from .serializers import EvaluationsSerializer
@api_view(['PUT'])
def update_evaluation(request, pk):
    try:
        evaluation = Evaluation.objects.get(pk=pk)
    except Evaluation.DoesNotExist:
        return Response({'error': 'Evaluation not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EvaluationsSerializer(evaluation, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

