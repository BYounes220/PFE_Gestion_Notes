from rest_framework import views
from rest_framework import generics
from Grades.serializers.assignmentSeializer import AssignmentSerializer
from rest_framework.permissions import IsAuthenticated
from Grades.entities.enseignement import Enseignement

class AssignTeacherElement(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

class ListAssignments(generics.ListAPIView):
    queryset = Enseignement.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]