# Generated by Django 5.2 on 2025-06-06 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yt_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mymodel',
            name='field2',
            field=models.CharField(max_length=100),
        ),
    ]
