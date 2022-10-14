function getFormData(e) {
    e.preventDefault()
    const form = document.getElementById('myForm');

    const title = document.getElementById("table").rows[0].cells[1].firstChild.value;
    const category = document.getElementById("table").rows[1].cells[1].firstChild.value;
    const url = document.getElementById("table").rows[2].cells[1].firstChild.value;
    const description = document.getElementById("table").rows[3].cells[1].firstChild.value;

    if (title == "" || category == "" || url == "" && description == "") {
        return false
    }
    
    var data={
                title:title,
                url:url,
                description :description ,
                category : category,
                published_at : new Date() 
             }
    let post = JSON.stringify(data)
    
    const link = "/formdata" ;
    const xhttp = new XMLHttpRequest();
    
    xhttp.open('POST',link, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.send(post);
    
    form.reset();
}











    // xhttp.onload = function () {
    //     if(xhttp.status === 201) {
    //         console.log("Post successfully created!") 
    //     }
    // }

    