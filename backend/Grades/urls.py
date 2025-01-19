from django.urls import path

from Grades.Views.elementsListing import ElementsListing
from django.urls import path
from Grades.Controllers.EvaluationView import EvaluationListCreateView , EvaluationRetrieveUpdateDestroyView , EvaluationsAPIView
from Grades.Controllers.ProfessorView import ProfesseurViewSet

urlpatterns = [
    path('elements/', ElementsListing.as_view(), name='list'),
    path('professeur/register/', ProfesseurViewSet.as_view(), name='professeur-register'),
    path('evaluations/', EvaluationListCreateView.as_view(), name='evaluation-list-create'),
    path('evaluations/<int:pk>/', EvaluationRetrieveUpdateDestroyView.as_view(), name='evaluation-detail'),
]

