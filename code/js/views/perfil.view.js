Vue.component('perfil-view', {
    template: `
<div id="perfil-view" class="card-view mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
        <h5 class="mdl-color-text--grey-700" style="margin: 0">Alterar Dados</h5>
    </div>
    <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="username_input">
            <label class="mdl-textfield__label" for="username_input">Email</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="pass_input">
            <label class="mdl-textfield__label" for="pass_input">Senha</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="rpass_input">
            <label class="mdl-textfield__label" for="rpass_input">Repetir senha</label>
        </div>
    </div>
    <div class="mdl-card__actions mdl-card--border" style="display: flex">
        <div style="flex-grow: 1"></div>
        <a v-on:click="load()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Salvar dados
        </a>
    </div>
    <ripple v-show="loading" :state="state"></ripple>
</div>
    `,
    data: function () {
        return {
            loading: false,
            state: 'loading'
        }
    },
    methods: {
        load: function () {
            this.loading = true;
            setTimeout(() => {
                this.state = 'ready';

                setTimeout(() => {
                    this.loading = false;
                    this.state = 'loading';
                }, 1000);
            }, 2000);
        }
    }
});