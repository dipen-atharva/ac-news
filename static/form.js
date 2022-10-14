function getFormData(e) {
    e.preventDefault()
    const title = document.getElementById("table").rows[0].cells[1].firstChild.value;
    const url = document.getElementById("table").rows[1].cells[1].firstChild.value;
    const desc = document.getElementById("table").rows[2].cells[1].firstChild.value;
    var data={
                title:title,
                url:url,
                desc :desc 
             }
    let post = JSON.stringify(data)
    
    const link = "/formdata" ;
    const xhttp = new XMLHttpRequest();
    
    xhttp.open('POST',link, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.send(post);
    
    xhttp.onload = function () {
        if(xhttp.status === 201) {
            console.log("Post successfully created!") 
        }
    }

    
}