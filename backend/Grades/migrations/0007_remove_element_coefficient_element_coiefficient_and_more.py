# Generated by Django 5.1.3 on 2024-12-07 10:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Grades', '0006_remove_element_coiefficient_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='element',
            name='coefficient',
        ),
        migrations.AddField(
            model_name='element',
            name='coiefficient',
            field=models.FloatField(default=1),
        ),
        migrations.AddField(
            model_name='professeur',
            name='email_professeur',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='professeur',
            name='nom_professeur',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='professeur',
            name='prenom_professeur',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='adress',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='cin',
            field=models.CharField(max_length=8),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='cne',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='email_acadymic',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='lieu_naissance',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='nom_etudiant',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='password',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='etudiant',
            name='prenom_etudiant',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='evaluation',
            name='id_element',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Grades.element'),
        ),
        migrations.AlterField(
            model_name='professeur',
            name='cin',
            field=models.CharField(max_length=7),
        ),
        migrations.AlterField(
            model_name='professeur',
            name='fonction',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='professeur',
            name='num_telephone',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='professeur',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
