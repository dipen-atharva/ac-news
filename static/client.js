
function getData(e) { 
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ul1").innerHTML +=
        this.responseText;
        console.log(xhttp.responseText);
      }
    };
    xhttp.open("GET", "http://localhost:4000/2");
    xhttp.send();
  }
