Vue.component('login-modal', {
    template: `
    <div id="login-modal" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__supporting-text">
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
        <div class="mdl-card__actions mdl-card--border" style="display: flex">
            <div style="flex-grow: 1"></div>
            <a v-on:click="login()" :disabled="!valido()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Entrar
            </a>
        </div>
    </div>
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
            this.$http.post('api/public/login', params).then((response) => {
                //foi
                console.log(response.data);
            }, (error) => {
                //nao
                console.log(error);
            })
        }
    }
});