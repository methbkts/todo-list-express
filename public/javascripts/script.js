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

/* form event listener */

document.getElementById('addTodo').addEventListener('submit', function (evt) {
    console.log('toto');
    evt.preventDefault();
    evt.stopPropagation();
    // alert("event propagation halted.");
    var form = evt.target;
    var datas = {} ; // title content

    form.querySelectorAll('[name]').forEach(function(el){
        // console.log('totototo ->');
        // console.log(el);
        datas[el.getAttribute('name')] = el.value;
    });
    console.log(datas);
    makeRequest('', form.getAttribute('method'), datas, function(res){
        alert('Todo ajouté');
        console.log(res);
        // recup dernier element de la DB
    });
});

var el = document.getElementById('todo-container');
// console.log(el);
var sortable = Sortable.create(el, {
    onEnd : function(evt) {
        var container = el;
        var childs = document.querySelectorAll('#todo-container > tr');
        var orderedIds = [];

        childs.forEach(function(child) {
            var id = child.getAttribute('data-id');
            orderedIds.push(id);
        })
        makeRequest('order', 'POST', {order : orderedIds}, function(res) {
            //
        })
    }
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