var count  = 1 ;
function getData(e) {
  e.preventDefault()
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("ul1").innerHTML += this.responseText;
    }
  };
  count++;
  console.log(count)
  xhttp.open("GET", `http://localhost:4000/2r?p=${count}` );
  xhttp.send();
}
