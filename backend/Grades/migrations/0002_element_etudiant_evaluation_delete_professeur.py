# Generated by Django 5.1.3 on 2024-12-02 19:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Grades', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=200)),
                ('volums_horaire', models.IntegerField()),
                ('type_element', models.CharField(max_length=20)),
                ('coiefficient', models.FloatField()),
                ('note_credit', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Etudiant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cne', models.CharField(max_length=10)),
                ('cin', models.CharField(max_length=8)),
                ('nom_etudiant', models.CharField(max_length=20)),
                ('prenom_etudiant', models.CharField(max_length=20)),
                ('date_naissance', models.DateField()),
                ('lieu_naissance', models.CharField(max_length=20)),
                ('genre', models.BooleanField()),
                ('adress', models.CharField(max_length=50)),
                ('telephone', models.CharField(max_length=10)),
                ('email_acadymic', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note_ordinaire', models.FloatField()),
                ('note_rattrapage', models.FloatField()),
                ('annee', models.IntegerField()),
                ('id_element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Grades.element')),
                ('id_etudiant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Grades.etudiant')),
            ],
        ),
        migrations.DeleteModel(
            name='Professeur',
        ),
    ]
