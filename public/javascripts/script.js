(function(){
    const xhr = new XMLHttpRequest();

// UPDATE EVENT
document.querySelectorAll('.done-button').forEach(function(element) {
    element.addEventListener('click', function(){
        // console.log(this.getAttribute('data-id'));
        alert('Effectué');
        var st = this.getAttribute('data-state') == "false" ;
        makeRequest(this.getAttribute('data-id'), 'PUT', {state:st});
    });
});

// DELETE EVENT
document.querySelectorAll('.delete-button').forEach(function(element) {
    element.addEventListener('click', function(){
        // console.log(this.getAttribute('data-id'));
        alert('Supprimé');
        makeRequest(this.getAttribute('data-id'), 'DELETE');
    });
});

// Ajax Request
function makeRequest(id, method, datas) {
    if (!xhr) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }
    xhr.onreadystatechange = alertContents;
    xhr.open(method, `/api/${id}`, true);
    // xhr.open(method, '/api/'+id, true); //alternative
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(datas ? JSON.stringify(datas) : null);
}

// Request State Check
function alertContents() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            // console.log("Error: "+xhr.status);
            alert('Erreur '+xhr.status+'\nIl y a eu un problème avec la requête.');
        }
    }
}
})();