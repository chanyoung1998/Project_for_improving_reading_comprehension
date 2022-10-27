# Generated by Django 4.1.2 on 2022-10-27 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0007_remove_content_book_chapter_and_more'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='content',
            name='book_chapter',
        ),
        migrations.AddConstraint(
            model_name='content',
            constraint=models.UniqueConstraint(fields=('book', 'chapter'), name='book_chapter'),
        ),
    ]
