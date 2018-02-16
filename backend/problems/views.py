from problems.models import Problem
from problems.serializers import ProblemSerializer

from django.contrib.auth.models import User
from rest_framework import permissions
from problems.permission import IsOwnerOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from rest_framework.response import Response
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route

import os
import time
from uuid import uuid4
import subprocess

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'problems': reverse('problems-list', request=request, format=format)
    })

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                             IsOwnerOrReadOnly,)
@api_view(['POST'])
def compile(request):
    code = request.POST.get('code')
    uid = str(uuid4())
    compiler = ["gcc","-lm","-o","../temp/"+uid,"../temp/"+uid+'.c','-Wall']
    resp = compile_code(code,compiler,uid)

    return Response(resp)

def compile_code(code,compiler,uid):
    time.sleep(1)
    f = open('../temp/'+uid+'.c','w')
    f.write(code)
    f.close()
    p = subprocess.run(compiler, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    stdout,stderr = p.stdout,p.stderr
    stderr = stderr.decode('utf-8')
    stderr = stderr.split('../temp/'+uid+".c:")
    stderr = "\nLine:".join(stderr)

    response = {'uid':uid,
        'stderr':stderr,
        'stdout':stdout,
        'returncode':p.returncode,
        'error': p.returncode != 0,
        'compiler':compiler[0],
        }
    return response
