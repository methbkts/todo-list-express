(function(){
    var xhr;

// UPDATE EVENT
document.querySelectorAll('.done-button').forEach(function(element) {
    element.addEventListener('click', function(){
        // console.log(this.getAttribute('data-id'));
        // alert('Effectué');
        var st = this.getAttribute('data-state') == "false" ;
        makeRequest(this.getAttribute('data-id'), 'PUT', {state:st}, function(res) {
            alert('Effectué');
            var span = document.createElement('tbody');
            span.innerHTML = res.response;
            element.closest('.todos').replaceWith(span.firstChild);
            // var el = element.closest('.todos');
            // console.log(el);
        });
    });
});

// DELETE EVENT
document.querySelectorAll('.delete-button').forEach(function(element) {
    element.addEventListener('click', function(){
        // console.log(this.getAttribute('data-id'));
        // alert('Supprimé');
        makeRequest(this.getAttribute('data-id'), 'DELETE', null, function(res) {
            alert('Supprimé');
            element.closest('.todos').remove();
            // el.remove;
            // console.log(this);
        });
        // document.location.reload(true);
    });
});

// Ajax Request
function makeRequest(id, method, datas, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // alert(xhr.responseText);
                callback(JSON.parse(xhr.responseText));
            } else {
                // console.log("Error: "+xhr.status);
                alert('Erreur '+xhr.status+'\nIl y a eu un problème avec la requête.');
            }
        }
    };
    xhr.open(method, `/api/${id}`, true);
    // xhr.open(method, '/api/'+id, true); //alternative
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(datas ? JSON.stringify(datas) : null);
}

})();