Vue.component('avaliar-view', {
    template: `
    <div id="avaliar-view" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <h5 class="mdl-color-text--grey-700" style="margin: 0">Fazer avaliação</h5>
        </div>

        <div class="mdl-card__supporting-text">
            <div class="mdl-textfield mdl-js-textfield">
                <textarea class="mdl-textfield__input" type="text" v-model="mensagem" rows= "3" id="avaliacao" ></textarea>
                <label class="mdl-textfield__label" for="avaliacao">Avaliação...</label>
            </div>
        </div>
        <div class="mdl-card__actions mdl-card--border" style="display: flex">
            <div style="flex-grow: 1"></div>
            <a :disabled="!mensagem" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Avaliar
            </a>
        </div>
    </div>
    `,
    data: function () {
        return {
            mensagem: ''
        }
    },
});