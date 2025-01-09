from django.urls import path
from .Views.notesModification import NotesModification
from .Views.notesRecherche import NotesRecherche
from .Views.elementsListing import ElementsListing


urlpatterns = [
    # Example route: Homepage of the Grades app
    path('saisie/', NotesModification.as_view() , name='insertion'),
    path('recherche/', NotesRecherche.as_view() , name='cherche'),
    path('elements/', ElementsListing.as_view(), name='list'),
]