var URL_API = 'http://mocs.000webhostapp.com/api/public/';

var Storage = (() => {
    var prefix = "mocs_";

    function Storage() { }

    Storage.prototype.gravar = function (entidade, dados) {
        localStorage.setItem(prefix + entidade, JSON.stringify(dados));
    }

    Storage.prototype.recuperar = function (entidade) {
        return this.existe(entidade) ? JSON.parse(localStorage.getItem(prefix + entidade)) : null;
    }

    Storage.prototype.existe = function (entidade) {
        return localStorage.getItem(prefix + entidade) ? true : false;
    }

    Storage.prototype.remover = function (entidade) {
        localStorage.removeItem(prefix + entidade);
    }

    return Storage;
})();

function isUserAuth() {
    var storage = new Storage();

    if (!storage.existe('token')) {
        window.location.href = "error.html";
    }
}

