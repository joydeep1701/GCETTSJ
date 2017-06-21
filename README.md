# GCETTSJ
GCETTS Judge  - by Joydeep Mukherjee

Aim: This application is aimed to replicate the current Dev C++

## Deploying
        virtualenv env --python=python3.5

        . env/bin/activate
        
        pip install flask

        pip install -r requirements.txt

        export FLASK_APP=hello.py

        flask run

Build: Build using Python,Javascript,Bootstrap,Ace Editor

Method: 

        1> When Code is Submitted, Server saves it in a file with an unique id

        2> Code is compiled using gcc & STDERR of gcc is parsed
        
        3> If STDERR is empty as returned by gcc        
             Then a successful request is sent to client
             On recieving the data client again requests the server 
             to run the code
             the STDOUT BUFFER of c code is parsed & returned to client
             
        4> If STDERR of gcc is not ewmpty then
             the server passes the STDERR of gcc to client
             Client highlights the errors in Code
             no further steps are taken
             
 Note: Server Can Handle Infinite Loops Using Timeout, Current Timeout is 1sec, on increasing timeout memory usage starts to            increase exponentially
