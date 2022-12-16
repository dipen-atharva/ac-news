function getLoginData(element, e) {
  // console.log("+++++++++++++++++++++++++++++++++++++++", e, element)

  e.preventDefault();
  const form = document.getElementById('exist');

  const username = document.getElementById("exist_username").value;
  const password = document.getElementById("exist_password").value;
  var data = {
    username: username,
    password: password,
  }
  let post = JSON.stringify(data)

  const link = "/authdata";
  const xhttp = new XMLHttpRequest();

  xhttp.responseType = "json";
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.response.result == 'redirect') {
        window.location = "http://localhost:4000" + xhttp.response.url;
      }
      else if (xhttp.response.result == 'error') {
        document.querySelector(".auth_page").innerHTML = `<div class="text-red-700 px-6 py-4 border-1 rounded relative mb-4 bg-red-200">
         <span class="text-xl inline-block mr-5 align-middle">
           <i class="fas fa-bell"></i>
         </span>
         <span class="inline-block align-middle mr-8">
         ${xhttp.response.error_message}
         </span>
         <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onclick="closeAlert(event)">
           <span>×</span>
         </button>
       </div>`
      }
    }
  };

  xhttp.open('POST', link, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhttp.send(post);
  form.reset();
}

function getCreateData(element, e) {
  console.log("++++++++++++getCreateData+++++++++++++++++++++++++++", element, e)
  e.preventDefault();
  const form = document.getElementById('new');
  const username = document.getElementById("new_username").value;
  const password = document.getElementById("new_password").value
  var data = {
    username: username,
    password: password,
  }
  let post = JSON.stringify(data)
  const link = "/authdata2";
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = "json";

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.response.result == 'redirect') {
        window.location = "http://localhost:4000" + xhttp.response.url;
      }
      else if (xhttp.response.result == 'error') {
        document.querySelector(".auth_page").innerHTML = `<div class="text-red-700 px-6 py-4 border-1 rounded relative mb-4 bg-red-200">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-bell"></i>
        </span>
        <span class="inline-block align-middle mr-8">
        ${xhttp.response.error_message}
        </span>
        <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onclick="closeAlert(event)">
          <span>×</span>
        </button>
      </div>`
      }
    }
  };
  xhttp.open('POST', link, true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhttp.send(post);

  form.reset();
}

function closeAlert(event) {
  let element = event.target;
  while (element.nodeName !== "BUTTON") {
    element = element.parentNode;
  }
  element.parentNode.parentNode.removeChild(element.parentNode);
}