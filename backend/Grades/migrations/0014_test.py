# Generated by Django 5.1.3 on 2025-01-05 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Grades', '0013_alter_professeur_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField()),
            ],
        ),
    ]
