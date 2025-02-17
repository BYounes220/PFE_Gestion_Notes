from rest_framework import generics
from Grades.entities.evaluation import Evaluation
from Grades.serializers.evaluationSerializer import EvaluationsSerializer
from Grades.serializers.evaluationCreationSerializer import EvaluationCreationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class EvaluationListCreateView(generics.ListCreateAPIView):
    serializer_class = EvaluationsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = Evaluation.objects.all()
        annee_academique = self.request.query_params.get('annee_academique')
        if annee_academique:
            queryset = queryset.filter(annee_academique=annee_academique)
        return queryset
    

class EvaluationCreateView(generics.CreateAPIView):
    serializer_class = EvaluationCreationSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        data= request.data
        if isinstance(data, list): 
            serializer = self.get_serializer(data=data, many=True)
        else: 
            serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvaluationUpdateView(generics.UpdateAPIView):
    serializer_class = EvaluationCreationSerializer
    permission_classes = [IsAuthenticated]
    def update(self, request, *args, **kwargs):
        data= request.data       
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
        else:
            serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EvaluationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationsSerializer

class EvaluationsAPIView(APIView):
    def get(self, request):
        evaluations = Evaluation.objects.all()
        serializer = EvaluationsSerializer(evaluations, many=True)
        return Response(serializer.data)


""" @api_view(['PUT'])
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
"""