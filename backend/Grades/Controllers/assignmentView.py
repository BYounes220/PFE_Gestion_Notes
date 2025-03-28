from rest_framework import views
from rest_framework import generics
from Grades.serializers.assignmentSeializer import AssignmentSerializer
from Grades.serializers.DepartmentSerializer import DepartmentSerializer
from Grades.serializers.FiliereSerializer import FiliereSerializer
from Grades.serializers.professeurSerializer import ProfesseurSerializer
from Grades.serializers.elementSerializer import ElementSerializer
from rest_framework.permissions import IsAuthenticated
from Grades.entities.enseignement import Enseignement
from insc_reeinsc_admin.entities.Departement import Departement
from insc_reeinsc_admin.entities.Professeur import Professeur
from insc_reeinsc_admin.entities.Filiere import Filiere
from insc_reeinsc_admin.entities.Element import Element
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound



class AssignTeacherElement(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]



class RemoveEnseignement(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Get data from the request body
            data = request.data
            professeur_email = data.get('professeur')  # Email of the teacher
            element_id = data.get('element')  # ID of the element

            # Validate input
            if not professeur_email or not element_id:
                return Response({'error': 'Missing professeur or element'}, status=status.HTTP_400_BAD_REQUEST)

            # Find the record to delete
            enseignement = Enseignement.objects.filter(professeur=professeur_email, element=element_id).first()

            if not enseignement:
                raise NotFound('Record not found')

            # Delete the record
            enseignement.delete()

            return Response({'message': 'Record deleted successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListAssignments(generics.ListAPIView):
    queryset = Enseignement.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]


class ListTeachers(generics.ListAPIView):
    serializer_class = ProfesseurSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        department = self.request.query_params.get("department", None)
        if department:
            return Professeur.objects.filter(departement_prof__nom_departement=department)


class ListElements(generics.ListAPIView):
    serializer_class = ElementSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        filiere = self.request.query_params.get("filiere", None)
        if filiere:
            return Element.objects.filter(module_elm__semestre_mod__filiere=filiere)

class ListDepartments(generics.ListAPIView):
    queryset = Departement.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]


class ListFilieres(generics.ListAPIView):
    serializer_class = FiliereSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        department = self.request.query_params.get("department", None)
        if department:
            return Filiere.objects.filter(dept_filiere__nom_departement=department)