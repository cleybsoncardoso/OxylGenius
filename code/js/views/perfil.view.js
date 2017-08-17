Vue.component('perfil-view', {
    template: `
<div id="perfil-view" class="card-view mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
        <h5 class="mdl-color-text--grey-700" style="margin: 0">Alterar Dados</h5>
    </div>
    <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" v-model="conta.nome" id="name_input" placeholder="">
            <label class="mdl-textfield__label" for="name_input">Nome</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="username_input" v-model="conta.email" placeholder="">
            <label class="mdl-textfield__label" for="username_input">Email</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="username_input" v-model="conta.telefone" placeholder="">
            <label class="mdl-textfield__label" for="username_input">Telefone</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="pass_input" placeholder="" v-model="conta.senha">
            <label class="mdl-textfield__label" for="pass_input">Senha Antiga</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="pass_input" placeholder="" v-model="conta.senhaNova">
            <label class="mdl-textfield__label" for="pass_input_new">Senha Nova</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="rpass_input" placeholder="" v-model="conta.senhaRepit">
            <label class="mdl-textfield__label" for="pass_input">Repetir senha</label>
        </div>

        <div class="mdl-color-text--red-500">
            {{error}}
        </div>
    </div>
    <div class="mdl-card__actions mdl-card--border" style="display: flex">
        <div style="flex-grow: 1"></div>
        <a :disabled="!formValido()" v-on:click="load()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Salvar dados
        </a>
    </div>
    <ripple v-show="loading" :state="state"></ripple>
</div>
    `,
    data: function () {
        return {
            loading: false,
            state: 'loading',
            conta: {
                nome: '',
                email: '',
                telefone: '',
                senha: '',
                senhaNova: '',
                senhaRepit: ''
            },
            error: ''
        }
    },
    methods: {
        load: function () {
            if (this.conta.senhaRepit != this.conta.senhaNova) {
                console.log("Senhas diferentes");
            } else if (!this.conta.senha && this.conta.senhaNova) {
                console.log("Informe a senha antiga")
            } else {
                this.loading = true;
                this.state = 'loading';
                var t = this;
                $.post(URL_API + 'usuario/update', this.conta)
                    .done(function (data) {
                        t.state = 'ready';
                        setInterval(function () {
                            t.loading = false;
                        }, 1000);
                    }).fail(function (error) {
                        t.state = 'ready';
                        setInterval(function () {
                            t.loading = false;
                        }, 1000);
                    });
            }
        },
        formValido: function () {
            if (this.conta.nome
                && this.conta.email
                && this.conta.telefone
                && this.conta.senhaNova
                && this.conta.senhaRepit
            ) {
                if (this.conta.email.indexOf('@') == -1) {
                    this.error = "Formato de email inválido";
                    return false;
                } else if (this.conta.senhaRepit != this.conta.senhaNova) {
                    this.error = "As senhas não correspondem";
                    return false;
                } else if (!this.conta.senha && this.conta.senhaNova) {
                    this.error = "Informe a senha antiga";
                    return false;
                }

                this.error = "";
                return true;
            } else {
                this.error = "";
                return false;
            }
        },
        getPerfil: function () {
            let token = localStorage.getItem("token");
            var t = this;
            $.post(URL_API + 'usuario/perfil', { token: token })
                .done(function (response) {
                    if (response != 404) {
                        t.conta = conta;
                        t.conta.token = localStorage.getItem("token");
                    }
                }).fail(function (error) {
                });
        }
    },
    created: function () {
        this.getPerfil();
    }
});