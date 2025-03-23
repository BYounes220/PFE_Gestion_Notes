from django.urls import path
from Grades.Controllers.elementsListing import ElementsListing
from django.urls import path
from Grades.Controllers.EvaluationView import EvaluationListCreateView , EvaluationRetrieveUpdateDestroyView , EvaluationsAPIView, EvaluationCreateView,EvaluationUpdateView
from Grades.Controllers.ProfessorView import ProfesseurViewSet
from Grades.Controllers.archiveView import AcademicYearsAPIView
from Grades.Controllers.assignmentView import AssignTeacherElement,ListAssignments
from Grades.Controllers.studentGrades import ListSemesters,SemesterGrades


urlpatterns = [
    path('elements/', ElementsListing.as_view(), name='list'),
    path('professeur/register/', ProfesseurViewSet.as_view(), name='professeur-register'),
    path('evaluations/', EvaluationListCreateView.as_view(), name='evaluation-list-create'),
    path('createEvaluations/', EvaluationCreateView.as_view()),
    path('updateEvaluations/', EvaluationUpdateView.as_view()),
    path('evaluations/<int:pk>/', EvaluationRetrieveUpdateDestroyView.as_view(), name='evaluation-detail'),
    path('annee_academique/',AcademicYearsAPIView.as_view(), name="archive"),
    path('assignTeacherElement/', AssignTeacherElement.as_view()),
    path('listAssignments/', ListAssignments.as_view()),
    path('listOfSemesters/', ListSemesters.as_view()),
    path('semesterStudentGrades/',SemesterGrades.as_view()),
]
