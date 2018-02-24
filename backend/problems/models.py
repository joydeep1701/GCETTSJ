from django.db import models

# Create your models here.

LANGUAGES = [('gcc','C -x99'),('g++','C++ STL 11'),('javac','JAVA 7'),('node','JS'),('python3','PYTHON 3')]

class Problem(models.Model):
    title = models.CharField(max_length=50)
    uin = models.CharField(max_length=10)
    description = models.TextField()
    start = models.DateField()
    end = models.DateField()
    subject_code = models.CharField(max_length=3)
    timeout = models.FloatField(default=0.2)
    n_test_cases = models.IntegerField(default=1)
    test_cases_uin = models.CharField(max_length=36)
    language = models.CharField(choices=LANGUAGES,default='C', max_length=10)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('uin',)
