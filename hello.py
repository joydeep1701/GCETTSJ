from sql import *
from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from passlib.apps import custom_app_context as pwd_context
from tempfile import gettempdir
import time
import api
from werkzeug.datastructures import ImmutableMultiDict
#from multiprocessing import Pool,TimeoutError
from helpers import *
import json

# configure application
app = Flask(__name__)

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response
# custom filter
#app.jinja_env.filters["usd"] = usd

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = gettempdir()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///gcettsj.db")

@app.route("/")
@login_required
def index():
    rows = db.execute("SELECT PID,PTITLE,PDEF FROM problems")
    leaderboard = db.execute("SELECT uroll,SUM(solved) AS score,name FROM 'leaderboard' GROUP BY uroll ORDER BY SUM(solved) DESC")
    return render_template('dashboard.html',data=rows,lb=leaderboard)

@app.route("/editor/<pid>" ,methods=["GET"])
@login_required
def editor(pid):
    problem = db.execute("SELECT * FROM problems WHERE PID=:id",id=pid)
    session["lastproblem"] = pid
    check = db.execute("SELECT * FROM 'leaderboard' WHERE problemid=:pid AND uroll=:uroll",uroll=session["uroll"],pid=session["lastproblem"])
    if len(check):
        flash("You have solved this problem","success")
    if len(problem):
        testcases = db.execute("SELECT STDIN,STDOUT FROM test_cases WHERE PID=:id",id=pid)
        return render_template("editor.html",data=problem,statement=True,sample=testcases,ntstc=len(testcases))
    return render_template("editor.html",data=problem,statement=False)
@app.route("/login",methods=["GET","POST"])
def login():
    """ Logs User In"""
    session.clear() #clear any previous user id

    if request.method == "POST":
        if not request.form.get("roll"):
            flash('must provide username','danger')
            return render_template("login.html")
        elif not request.form.get("password"):
            flash('must provide password','danger')
            return render_template("login.html")
        else:
            rows = db.execute("SELECT * FROM users WHERE UnivRoll = :roll",roll=html_escape(request.form.get("roll")))
            if len(rows) != 1 or not pwd_context.verify(request.form.get("password"), rows[0]["Password"]):
                flash('Invalid password', 'danger')
                return render_template("login.html")
            session["uroll"] = rows[0]["UnivRoll"]
            session["name"] = rows[0]["Name"]
            session["lastproblem"] = "None"
            return redirect(url_for("index"))
    else:
        return render_template("login.html")
@app.route("/register",methods=["GET","POST"])
def register():
    session.clear() #remove old username
    if request.method == "POST":
        if not request.form.get("roll"):
            flash("must provide university roll","danger")
            return render_template("login.html")
        elif not request.form.get("password1"):
        	flash('must provide password', 'danger')
        	return render_template("login.html")
        elif not request.form.get("name"):
        	flash('must provide name', 'danger')
        	return render_template("login.html")
        rows = db.execute("SELECT * FROM users WHERE UnivRoll = :roll",roll=html_escape(request.form.get("roll")))
        if len(rows) != 0:
            flash("Roll No Used","danger")
        db.execute("INSERT INTO 'users' ('Name','Stream','UnivRoll','Password') VALUES (:name,:stream,:uroll,:password)",name=html_escape(request.form.get("name")),stream=html_escape(request.form.get("stream")),uroll=html_escape(request.form.get("roll")),password = pwd_context.hash(request.form.get("password1")))
        session["uroll"] = request.form.get("roll")
        session["name"] = request.form.get("name")
        return redirect(url_for("index"))
@app.route("/checkuserid/<ui>", methods=["GET"])
def checkuserid(ui):
    """Checks UserID during login"""
    rows = db.execute("SELECT * FROM users WHERE UnivRoll = :roll",roll=html_escape(ui))
    return str(len(rows))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/api/compile", methods=["GET", "POST"])
@login_required
def apicompile():
    if request.method == "POST":
        data = dict(request.form)
        code = str(data['code'][0])
        #code = request.form.post('code')
        code_filename = str(time.time())
        stderr = api.compile_code(code,code_filename)
        if stderr == '':
            return code_filename+"|~|"+"0"+"|~|"+"Compilation Successful"
        else:
            return code_filename+"|~|"+"1"+"|~|"+stderr
    else:
        return "Invalid Request"
@app.route("/api/run",methods=["GET","POST"])
@login_required
def  apirun():
    #return "Scheduled to run"
    if request.method == "POST":
        id = request.form.get('pid')
        stdout = api.run_code(id,request.form.get('stdin'))
        return stdout
    else:
        return "Aw, Something is wrong"

@app.route("/api/testcases",methods=["GET","POST"])
@login_required
def fetch_test_cases():
    if request.method == "POST":
        pid = request.form.get('pid')
        testcases = db.execute("SELECT STDIN,STDOUT FROM test_cases WHERE PID=:id",id=pid)
        session["test_cases"] = testcases
        session["lastproblem"] = pid
        return str((testcases))
    return "Aw, Something is wrong"
@app.route("/api/final",methods=["GET","POST"])
@login_required
def final_check():
    if request.method == "POST":
        solved = 1
        check = db.execute("SELECT * FROM 'leaderboard' WHERE problemid=:pid AND uroll=:uroll",uroll=session["uroll"],pid=session["lastproblem"])
        if len(check):
            return "[\"Already solved\"]"
        result = list("")
        code_id = request.form.get('code_id')
        for i,case in enumerate(session["test_cases"]):
            code_output = api.run_code(code_id,case["STDIN"])
            if code_output == case["STDOUT"]:
                result.append("Passed")
            else:
                solved = 0
                result.append("Failed")
        if solved:
            db.execute("INSERT INTO 'leaderboard' ('uroll','problemid','solved','name') VALUES (:uroll,:pid,:s,:name)",uroll=session["uroll"],pid=session["lastproblem"],s=1,name=session["name"])
        return json.dumps(result)
    else:
        return "Aw, Something is wrong"
@app.route("/add",methods=["GET","POST"])
@login_required
def add_problem():
    if request.method == "POST":
        r = dict(request.form)
        db.execute("INSERT INTO 'problems' ('PTITLE','PDEF') VALUES (:pt,:pdf)",pt=r['title'][0],pdf=r['def'][0])
        rows = db.execute("SELECT PID FROM problems WHERE PTITLE = :pt AND PDEF=:pdf",pt=r['title'][0],pdf=r['def'][0])
        prid = rows[0]['PID']
        for sin,sout in zip(r['in'],r['out']):
            db.execute("INSERT INTO 'test_cases' ('PID','STDIN','STDOUT') VALUES (:pid,:si,:so)",pid=prid,si=sin,so=sout)
        return redirect(url_for("index"))
    return render_template("add.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0')
