Vue.component('usuarios-view', {
    template: `
<div id="usuarios-view">
    <div id="seachbar" class="card-view mdl-card mdl-shadow--2dp" style="overflow: visible">
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
                <li class="mdl-list__item" style="padding: 8px 16px">
                    <span class="mdl-list__item-primary-content">
                        Usuário A
                    </span>
                    <button id="mudar-funcao-0" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white">
                        <i class="material-icons">assignment</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="mudar-funcao-0">
                        <li class="mdl-menu__item">Função A</li>
                        <li class="mdl-menu__item">Função B</li>
                        <li class="mdl-menu__item">Função C</li>
                    </ul>
                </li>
                <hr style="border-color: #e5e5e5; margin: 0" />
                <li class="mdl-list__item" style="padding: 8px 16px">
                    <span class="mdl-list__item-primary-content">
                        Usuário B
                    </span>
                    <button id="mudar-funcao-1" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white">
                        <i class="material-icons">assignment</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="mudar-funcao-1">
                        <li class="mdl-menu__item">Função A</li>
                        <li class="mdl-menu__item">Função B</li>
                        <li class="mdl-menu__item">Função C</li>
                    </ul>
                </li>
                <hr style="border-color: #e5e5e5; margin: 0" />
                <li class="mdl-list__item" style="padding: 8px 16px">
                    <span class="mdl-list__item-primary-content">
                        Usuário C
                    </span>
                    <button id="mudar-funcao-2" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-color--indigo-500 mdl-color-text--white">
                        <i class="material-icons">assignment</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="mudar-funcao-2">
                        <li class="mdl-menu__item">Função A</li>
                        <li class="mdl-menu__item">Função B</li>
                        <li class="mdl-menu__item">Função C</li>
                    </ul>
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