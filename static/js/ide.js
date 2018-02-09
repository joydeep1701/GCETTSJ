var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setMode("ace/mode/c_cpp");

function extract_error_lines(data){
  editor.getSession().clearAnnotations();/*
  console.log(data[2]);
  console.log(data[0]);
  console.log(data[1]);*/
  var i = 0;
  var len = data.length;
  for(i = 0;i < len - 3;i++){
    if(isFinite(data[i]) && isFinite(data[i+2]) && data[i]!=" " && data[i+2]!=" "){
      //console.log(data[i]+" "+data[i+2]);
      editor.getSession().setAnnotations([{
        row: parseInt(data[i])-1,
        text: "Error Detected",
        type: "error" // also warning and information
      }]);
    }
  }
}
function compile_code(){
  document.getElementById("modal_head").innerHTML = "Keep Calm";
  document.getElementById("modal_body").innerHTML = "Your code was sent to server";
  $("#message").modal();
  var code = editor.getSession().getValue();
  var formdata = new FormData();
  formdata.append("code",code);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      data = xhttp.responseText;
      data = data.split("|~|")
      //document.getElementById("compiler_output").innerHTML = "<pre>"+data[2]+"</pre>";
      extract_error_lines(data[2]);
      var pid = data[0];
      var failed = parseInt(data[1]);
      console.log(failed);
      document.getElementById("modal_head").innerHTML = "Submission ID: " + data[0];
      if(failed){
        document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-danger\"><div class=\"panel-heading\" > Compilation Error: "+ data[0] +"</div><div class=\"panel-body\"><pre>" + data[2] +"</pre></div></div></div>";
      }
      else{
        //document.getElementById("modal_head").innerHTML = "";
        document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-success\"><div class=\"panel-heading\" > Compilation Successful, Scheduled to Run :"+ data[0]+"</div><div class=\"panel-body\"><pre>" + data[2] +"</pre></div></div></div>";
        run_code(data[0]);
      }
      $("#message").modal();
    }
  };
  xhttp.open("POST","/api/compile",true);
  //xhttp.setRequestHeader("Content-type","multipart/formdata");
  xhttp.send(formdata);
}
function run_code(pid){
  //console.log(pid);
  var stdin = document.getElementById("input").value;
  var formdata = new FormData();
  formdata.append("pid",pid);
  formdata.append("stdin",stdin);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      data = xhttp.responseText;
      document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-primary\"><div class=\"panel-heading\" > Output: "+ pid+"</div><div class=\"panel-body\"><pre>" + data +"</pre></div></div></div>";
    }
  };
  xhttp.open("POST","/api/run",true);
  //xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send(formdata);
}
function check_compile(){
  document.getElementById("modal_head").innerHTML = "Keep Calm";
  document.getElementById("modal_body").innerHTML = "Your code was sent to server";
  $("#message").modal();
  var code = editor.getSession().getValue();
  var formdata = new FormData();
  formdata.append("code",code);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      data = xhttp.responseText;
      data = data.split("|~|")
      //document.getElementById("compiler_output").innerHTML = "<pre>"+data[2]+"</pre>";
      extract_error_lines(data[2]);
      var pid = data[0];
      var failed = parseInt(data[1]);
      console.log(failed);
      document.getElementById("modal_head").innerHTML = "Submission ID: " + data[0];
      if(failed){
        document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-danger\"><div class=\"panel-heading\" > Compilation Error: "+ data[0] +"</div><div class=\"panel-body\"><pre>" + data[2] +"</pre></div></div></div>";
      }
      else{
        //document.getElementById("modal_head").innerHTML = "";
        document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-success\"><div class=\"panel-heading\" > Compilation Successful, Scheduled to Run :"+ data[0]+"</div><div class=\"panel-body\"><pre>" + data[2] +"</pre></div></div></div>";
        check_run(data[0]);
      }
      $("#message").modal();
    }
  };
  xhttp.open("POST","/api/compile",true);
  //xhttp.setRequestHeader("Content-type","multipart/formdata");
  xhttp.send(formdata);
}
function check_run(pid){
  //console.log(pid);
  var stdin = document.getElementById("test_in").value;
  var stdout = document.getElementById("test_out").value;
  var formdata = new FormData();
  formdata.append("pid",pid);
  formdata.append("stdin",stdin);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      data = xhttp.responseText;
      console.log("|",data,"|",stdout,"|");
      if(data == stdout)
        document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-primary\"><div class=\"panel-heading\" > Output: "+ pid+"</div><div class=\"panel-body\"><p>Your Code Gave Correct Output </p></div></div></div>";
      else
      document.getElementById("modal_body").innerHTML = "<div class=\"row\"><div class=\"panel panel-danger\"><div class=\"panel-heading\" > Output: "+ pid+"</div><div class=\"panel-body\"><p>Your Code Gave Incorrect Output </p></div></div></div>";
      document.getElementById("modal_body").innerHTML += "<div class=\"row\"><button type=\"button\" class=\"btn btn-danger\" onclick=\"submit_code("+pid+")\">Submit Code</button></div>";
    }
  };
  xhttp.open("POST","/api/run",true);
  //xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send(formdata);
}
function submit_code(pid){
  //console.log(pid)
  document.getElementById("modal_body").innerHTML = "<p>Fetching Test Cases</p>";
  var formdata = new FormData();
  formdata.append("pid",document.getElementById("problemid").value);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      document.getElementById("modal_body").innerHTML = "<h3>Running Test Cases</h3><hr>";
      data = xhttp.responseText;
      final_check(pid)

    }
  };
  xhttp.open("POST","/api/testcases");
  xhttp.send(formdata);
}
function final_check(pid){
  var formdata = new FormData();
  formdata.append("code_id",pid);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      data = JSON.parse(xhttp.responseText);
      console.log(data);
      if(data == 'Already solved')
        document.getElementById("modal_body").innerHTML += "<div class=\"alert alert-warning\"><strong>Note:</strong> This problem is already accepted </div>"
      var test = 1;
      for(var i = 0;i < parseInt(data.length);i++){
        document.getElementById("modal_body").innerHTML += "<p>Test Case #" + i +": "+ data[i] +"</p>";
        if(data[i] == "Failed")
          test = 0;
      }
      if(test){
        solved();
      }
    }
  };
  xhttp.open("POST","/api/final");
  xhttp.send(formdata);
}
function solved(){
  document.getElementById("modal_body").innerHTML += "<div class=\"alert alert-success\"><strong>Success!</strong> You have solved this problem.</div>";
}
