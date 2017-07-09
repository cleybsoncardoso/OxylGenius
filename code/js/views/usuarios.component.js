Vue.component('usuarios-view', {
    template: `
<div id="usuarios-view">
    <div id="seachbar" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <div class="mdl-textfield mdl-js-textfield" id="search-input">
                <input class="mdl-textfield__input" type="text" id="search" v-model="searchText">
                <label class="mdl-textfield__label" for="search">Pesquisar por um usuário</label>
            </div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :disabled="!searchText">
                Pesquisar
            </button>
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <ul class="usuarios-list mdl-list">
                <li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        Usuário A
                    </span>
                </li>
                <li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        Usuário B
                    </span>
                </li>
                <li class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        Usuário C
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>
    `,
    data: function () {
        return {
            searchText: ''
        }
    },
    methods: {
    }
});