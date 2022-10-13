var count  = 1 ; 
function getData(e) { 
  e.preventDefault()
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("sec1").innerHTML += this.responseText;
    }
  };
  // var val = document.getElementById("myAnchor").getAttribute("href");  
  // var pageNumber = val.split( "=")[1];
  // console.log(pageNumber); 
  count++;
  console.log(count)
  xhttp.open("GET", `http://localhost:4000/dipen?p=${count}` );
  xhttp.send();
}
