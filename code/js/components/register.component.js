Vue.component('register', {
    template: `
    <div id="register">
        <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">

            <h1>Cadastro</h1>
                <div class="mdl-card__supporting-text">
                    
                    <div class="form-group" :class="{'has-error': errors.has('email') }" >
                        <input class="form-control" type="text" v-model="email" v-validate.initial="email" data-rules="required|email" type="email" id="email_input">
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                        <label class="mdl-textfield__label" for="email_input">Email</label>
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="form-control" v-model="password" v-validate.initial="password" data-rules="required|passphrase" type="password" id="pass_input">
                        <label class="mdl-textfield__label" for="pass_input">Senha</label>
                        <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="form-control" v-model="passwordRepeat" v-validate.initial="passwordRepeat" data-rules="required|passphrase" type="password" id="pass_repeat_input">
                        <label class="mdl-textfield__label" for="pass_repeat_input">Confimação da Senha</label>
                        <p class="text-danger" v-if="errors.has('passwordRepeat')">{{ errors.first('passwordRepeat') }}</p>
                    </div>

                </div>
                <div class="mdl-card__actions mdl-card--border" style="display: flex">
                    <div style="flex-grow: 1"></div>
                    <a v-on:click="cadastrar()" :disabled="!valido()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                        Cadastrar
                    </a>
                </div>
        <div v-else>
            <h1 class="submitted">Cadastro realizado com sucesso.</h1>
        </div>        
    </div> 
    `,
    data: function () {
        return {
            name: '',
            password: '',
            passwordRepeat: ''
        }
    },
    methods: {
        //verifica se as senhas digitadas sao iguais
        valido: function(){
            if(this.password==this.passwordRepeat){
                return this.name && this.password && this.passwordRepeat;
            }
        },
        cadastrar: function () {
            var dados = {
                nome: this.name,
                senha: this.password,
            }

            this.$http.post('url', dados).then((response) => {
                //cadastrou
            }, () => {
                //nao cadastrou
            })
        }
    }
});