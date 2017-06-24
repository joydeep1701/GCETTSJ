import time
from subprocess import (run,PIPE,TimeoutExpired)
import signal
import os

class cd:
    """
    Context manager for changing the current working directory
    https://stackoverflow.com/questions/431684/how-do-i-cd-in-python
    """
    def __init__(self, newPath):
        self.newPath = os.path.expanduser(newPath)

    def __enter__(self):
        self.savedPath = os.getcwd()
        os.chdir(self.newPath)

    def __exit__(self, etype, value, traceback):
        os.chdir(self.savedPath)
def compile_code(code,code_filename):
    with cd("./temp"):
        f = open(code_filename+".c","w")
        f.write(code)
        f.close()
        p = run([r"/usr/bin/gcc","-lm","-o",code_filename,code_filename+".c"],stdout=PIPE,stderr=PIPE)
        stdout,stderr = p.stdout,p.stderr
        stderr = stderr.decode('utf-8')
        stderr = stderr.split(code_filename+".c:")
        stderr = "".join(stderr)
        return stderr
def run_code(pid,inp):
    with cd("./temp"):
        try:
            f = open(pid,"r")
            f.close()
        except FileNotFoundError:
            return "Aw, Something went wrong :("
        try:
            p = run([r"./"+pid],shell=False,timeout=1,input=str.encode(inp),stdout=PIPE,stderr=PIPE)
        except TimeoutExpired:
            return "We know you are trying to do something useful,<br>For that you need a proper computer<br>Please BUY one<br>Our Servers are too LAZY to wait for your program to finish :)"
        else:
            stdout,stderr = p.stdout,p.stderr
            stdout = stdout.decode('utf-8')
            if p.returncode == -signal.SIGSEGV:
                return "We know pointers are scary,DOUBLE CHECK them before you run again, your code tried to access some illegal memory & suffered SEGMENTATION FAULT :("
            elif p.returncode == -signal.SIGFPE:
                return "Looks like your code suffered Floating Point Error, be sure that you are not trying to divide by zero :P"
            return stdout
