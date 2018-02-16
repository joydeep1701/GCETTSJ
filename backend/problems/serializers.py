from rest_framework import serializers
from problems.models import Problem

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('uin','title','description','end','language')
