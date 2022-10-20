# Generated by Django 4.1.2 on 2022-10-20 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0003_quiz_type_alter_quiz_choice'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='quiz_number',
            field=models.SmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='type',
            field=models.BooleanField(default=True, verbose_name='객관식'),
        ),
    ]
