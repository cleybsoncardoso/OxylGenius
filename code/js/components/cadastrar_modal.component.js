Vue.component('cadastrar-modal', {
    template: `
    <modal id="cadastrar-modal">
        <div slot="modal-body">
        
                        <br>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-model="conta.email" id="username_input">
                <label class="mdl-textfield__label" for="username_input">Email</label>
            </div>
            <br><br>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="conta.nome" id="name_input">
            <label class="mdl-textfield__label" for="username_input">Nome</label>
        </div>
        <br><br>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" v-model="conta.password" type="password" id="pass_input">
                <label class="mdl-textfield__label" for="pass_input">Senha</label>
            </div>
        </div>
        <div slot="modal-actions" style="display: flex;">
            <span style="flex-grow: 1"></span>
            <a v-on:click="login()" style="float: right" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Cadastrar
            </a>
        </div>
    </modal>
    `,
    data: function () {
        return {
            conta: {}
        }
    },
    methods: {
        login: function () {
            $.toast('Toast message to be shown')            
            // console.log(this.conta);
            // console.log(URL_API + 'usuario');
            // $.post(URL_API + 'usuario', this.conta)
            //     .done(function (data) {
            //         console.log(data);
            //     }).fail(function (error) {
            //         console.log(error);
            //     });
        }

    }
});