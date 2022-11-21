# Generated by Django 4.1.2 on 2022-11-07 13:19

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0002_content_keywords'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='keywords',
        ),
        migrations.AddField(
            model_name='book',
            name='keywords',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, default=list, size=None),
        ),
    ]
