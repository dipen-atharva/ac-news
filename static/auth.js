function getLoginData(e) {
    e.preventDefault();
    const form = document.getElementById('exist');

    const username = document.getElementById("table").rows[0].cells[1].firstChild.value;
    const password = document.getElementById("table").rows[1].cells[1].firstChild.value

    var data={
                username:username,
                password:password,
             }
    let post = JSON.stringify(data)
    
    const link = "/authdata" ;
    const xhttp = new XMLHttpRequest();
    
    xhttp.open('POST',link, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.send(post);
    
    form.reset();
}

function getCreateData(e) {
    e.preventDefault();
    const form = document.getElementById('new');

    const username = document.getElementById("table2").rows[0].cells[1].firstChild.value;
    const password = document.getElementById("table2").rows[1].cells[1].firstChild.value

    var data={
                username:username,
                password:password,
             }
    let post = JSON.stringify(data)
    
    const link = "/authdata" ;
    const xhttp = new XMLHttpRequest();
    
    xhttp.open('POST',link, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.send(post);
    
    form.reset();
}