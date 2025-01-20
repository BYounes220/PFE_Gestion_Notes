from rest_framework import generics
from Grades.entities.evaluation import Evaluation
from Grades.serializers.evaluationSerializer import EvaluationsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class EvaluationListCreateView(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationsSerializer
    permission_classes = [IsAuthenticated]

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
