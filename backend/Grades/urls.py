from django.urls import path
from .views import ProfesseurViewSet, EvaluationListCreateView, EvaluationRetrieveUpdateDestroyView

urlpatterns = [
    path('professeur/register/', ProfesseurViewSet.as_view(), name='professeur-register'),
    path('evaluations/', EvaluationListCreateView.as_view(), name='evaluation-list-create'),
    path('evaluations/<int:pk>/', EvaluationRetrieveUpdateDestroyView.as_view(), name='evaluation-detail'),
]
