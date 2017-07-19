var URL_API = 'http://mocs.freeiz.com/api/public/';

var Storage = (() => {
    var prefix = "mocs_";

    function Storage() { }

    Storage.prototype.gravar = function (entidade, dados) {
        localStorage.setItem(prefix + entidade, JSON.stringify(dados));
    }

    Storage.prototype.recuperar = function (entidade) {
        return this.existe(entidade) ? JSON.parse(localStorage.getItem(entidade)) : null;
    }

    Storage.prototype.existe = function (entidade) {
        return localStorage.getItem(entidade) ? true : false;
    }

    return Storage;
})();

function isUserAuth() {
    var storage = new Storage();

    if (!storage.existe('token')) {
        window.location.href = "error.html";
    }
}