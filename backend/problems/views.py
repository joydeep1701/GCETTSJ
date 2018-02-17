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
from multiprocessing import Pool
import signal

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
def compileHandler(request):
    code = request.POST.get('code')
    uid = str(uuid4())
    compiler = ["gcc","-lm","-o","../temp/"+uid,"../temp/"+uid+'.c','-Wall','-Wextra']
    resp = compile_code(code,compiler,uid)

    return Response(resp)

@api_view(['POST'])
def runHandler(request):
    codeuid = request.POST.get('codeuid')
    stdin = [request.POST.get('stdin')]
    command = ["../temp/"+codeuid]
    response = batch_run(codeuid,command,stdin,1)
    return Response(response)


def compile_code(code,compiler,uid):
    #time.sleep(1)
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
        'error': stderr != '',
        'compiler':compiler[0],
        }
    return response

def batch_run(target,command,stdin,timeout):
    process_inp = []
    for inpt in stdin:
        process_inp.append([target,command,inpt,timeout])
    pool = Pool()
    results = pool.map(run_code,process_inp)
    # free out memory
    pool.close()
    # wait for workers to finish, catch exceptions
    pool.join()
    return results

def run_code(arr):
    target,command,stdin,timeout = arr
    response = {
        'errors':{},
        'stdout':'',
        'stderr':'',
        'returncode':'',
    }

    try:
        f = open('../temp/'+target,'r')
        f.close()
    except FileNotFoundError:
        response['errors']['type'] = 'FileNotFoundError'
        response['errors']['text'] = 'Requested executable '+target+' was not found'
        return response

    try:
        p = subprocess.run(command,timeout=timeout,input=str.encode(stdin),stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    except subprocess.TimeoutExpired:
        response['errors']['type'] = 'TimeoutExpired'
        response['errors']['text'] = 'Your code was terminated due to timeout. Your code took too long to exit.'
        return response
    else:
        returncode = p.returncode
        stdout, stderr = p.stdout, p.stderr
        stdout = stdout.decode('utf-8')

        if returncode == -signal.SIGSEGV:
            response['errors']['type'] = 'SIGSEGV'
            response['errors']['text'] = """Segmentation Fault.
                Your code exited with status SIGSEGV.
                A segmentation fault occurs when a program attempts to access a
                memory location that it is not allowed to access, or attempts to
                access a memory location in a way that is not allowed
                (for example, attempting to write to a read-only location,
                 or to overwrite part of the operating system).
             """

        elif returncode == -signal.SIGFPE:
            response['errors']['type'] = 'SIGFPE'
            response['errors']['text'] = 'Floating point error'

        elif returncode != 0:
            response['errors']['type'] = 'Non-zero exit code'
            response['errors']['text'] = 'Your program exited with status ' + str(returncode)

        else:
            response['stdout'] = stdout
            response['stderr'] = stderr
            response['returncode'] = returncode

        return response
