Vue.component('login-modal', {
    template: `
    <modal id="login-modal">
        <div slot="modal-body">
            <button class="loginBtn loginBtn--facebook">
                Login pelo Facebook
            </button>
            <button class="loginBtn loginBtn--google">
                Login pelo Google
            </button>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-model="name" id="username_input">
                <label class="mdl-textfield__label" for="username_input">Email</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" v-model="password" type="password" id="pass_input">
                <label class="mdl-textfield__label" for="pass_input">Senha</label>
            </div>
        </div>
        <div slot="modal-actions" style="display: flex;">
            <span style="flex-grow: 1"></span>
            <a v-on:click="login()" :disabled="!valido()" style="float: right" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Entrar
            </a>
        </div>
    </modal>
    `,
    data: function () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        valido: function(){
            return this.name && this.password;
        },
        login: function () {
            var params = {
                login: this.name,
                senha: this.password,
            }
            this.$http.post(URL_API + 'login', params).then((response) => {
                //foi
                console.log(response.data);
                var storage = new Storage();
                storage.gravar('token', response.data);
            }, (error) => {
                //nao
                console.log(error);
            })
        }
    }
});