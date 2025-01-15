from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    #incoming http requests to GradeMangemenet/ will be forwarded into the urls file in GradeMang app
    path('Grades/', include('Grades.urls')),
    path('accounts/', include('accounts.urls')),
]
