var xhttp = new XMLHttpRequest();
xhttp.open("GET","../json/user.json",true);
xhttp.send();
xhttp.onreadystatechange = userList;

function userList(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
        var response = JSON.parse(xhttp.responseText);
        var output = '';
        for(var i=0;i<response.challenge.length;i++){
            var li = `<li class="user clearfix">
                        <div class="col-5">
                            <img src="${response.challenge[i].image}">
                            <span>${response.challenge[i].name}</span>
                        </div>
                        <div class="col-5">${response.challenge[i].dateStarted}</div>
                        <div class="col-5">${response.challenge[i].dateRequested}</div>
                        <div class="col-5">-</div>
                        <div class="col-5"><a href="javascript:void(0)">View</a></div>
                       </li>`;
            output += li;
        }
        document.querySelector('.user-list').innerHTML += output;
    }
}