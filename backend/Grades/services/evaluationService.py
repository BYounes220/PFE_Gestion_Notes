from rest_framework.decorators import api_view
from Grades.dal.evaluationDao import EvaluationDao
from rest_framework.response import Response
from Grades.serializers.evaluationSerializer import EvaluationsSerializer
from rest_framework import status



@api_view(['PUT'])
def update_evaluation(request, pk):
    evaluation = EvaluationDao.get(pk=pk)
    if not evaluation:
        return Response({'error': 'Evaluation not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EvaluationsSerializer(evaluation, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
