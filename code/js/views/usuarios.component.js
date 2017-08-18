Vue.component('usuarios-view', {
    template: `
<div id="usuarios-view">
    <div id="seachbar" class="card-view mdl-card mdl-shadow--2dp" style="overflow: visible">
        <div class="mdl-card__title">
            <div class="mdl-textfield mdl-js-textfield" id="search-input">
                <input class="mdl-textfield__input" type="text" id="search" v-model="searchText">
                <label class="mdl-textfield__label" for="search">Pesquisar por um usuário</label>
            </div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :disabled="!searchText" @click="filtar">
                Pesquisar
            </button>
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <ul class="usuarios-list mdl-list">
                <div v-for="usuario in usuarios">
                    <li class="mdl-list__item" style="padding: 8px 16px">
                        <span class="mdl-list__item-primary-content">
                            {{usuario.Nome}}
                        </span>
                        <row>
                            <button id="mudar-funcao-0" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white" v-if="usuario.Tipo != 'U'" @click="alterar('U',usuario.ID)">
                                U
                            </button>
                            <button id="mudar-funcao-0" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white" v-if="usuario.Tipo != 'F'" @click="alterar('F',usuario.ID)">
                                F
                            </button>
                            <button id="mudar-funcao-0" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white" v-if="usuario.Tipo != 'G'" @click="alterar('G',usuario.ID)">
                                G
                            </button>
                        </row>
                    </li>
                    <hr style="border-color: #e5e5e5; margin: 0" />
                </div>
            </ul>
        </div>
    </div>
</div>
    `,
    data: function () {
        return {
            searchText: '',
            usuarios: [],
            usuariosAux: []
            
        }
    },
    methods: {
        alterar: function (funcao, id) {
            params = {
                token: localStorage.getItem("token"),
                tipo: funcao,
                id: id
            }
            var t = this;
            $.post(URL_API + 'usuario/updatePermissao', params)
                .done(function (data) {
                    if (data == 404) {
                        $.toast('Faça o login novamente no sistema');                        
                    } else {
                        usuarios(users => {
                            t.usuarios = users.usuarios;
                            t.usuariosAux = t.usuarios;
                            console.log(this.usuarios);
                        });
                        $.toast('Erro ao cadastrar');

                    }

                }).fail(function (error) {
                    $.toast('Erro ao alterar funcao')
                });

        },
        filtar: function(){
            this.usuarios = this.usuariosAux.filter(item=>{
                return item.Nome.toUpperCase().indexOf(this.searchText.toUpperCase()) > -1
            });
        }
    },
    created: function () {
        usuarios(users => {
            this.usuarios = users.usuarios;
            this.usuariosAux = this.usuarios;
            console.log(this.usuarios);
        });
    }
});

function usuarios(call) {
    let token = localStorage.getItem("token");
    $.get("http://mocs.000webhostapp.com/api/public/usuario?token=" + token, function (data) {
        call(data);
    });
}