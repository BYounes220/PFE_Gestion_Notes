# Generated by Django 5.1.3 on 2025-01-19 20:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insc_reeinsc_admin', '0003_module_element_semestre_module_semestre_mod'),
    ]

    operations = [
        migrations.AddField(
            model_name='element',
            name='professeur',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='insc_reeinsc_admin.professeur'),
        ),
        migrations.AddField(
            model_name='professeur',
            name='id_prof',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
