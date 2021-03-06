# Generated by Django 2.0.2 on 2018-02-16 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('uin', models.CharField(max_length=10)),
                ('description', models.TextField()),
                ('start', models.DateTimeField(auto_now_add=True)),
                ('end', models.DateTimeField()),
                ('subject_code', models.CharField(max_length=3)),
                ('language', models.CharField(choices=[('C', 'gcc'), ('C++', 'g++'), ('JAVA', 'javac'), ('JAVASCRIPT', 'node'), ('PYTHON 3', 'python3')], default='C', max_length=10)),
            ],
            options={
                'ordering': ('uin',),
            },
        ),
    ]
