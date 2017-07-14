Vue.component('itens-view', {
    template: `
<div id="itens-view">
    <div id="seachbar" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <div class="mdl-textfield mdl-js-textfield" id="search-input">
                <input class="mdl-textfield__input" type="text" id="search" v-model="searchText">
                <label class="mdl-textfield__label" for="search">Pesquisar por uma obra</label>
            </div>

            <button v-on:click="addItem()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Adicionar Item
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4">
            <div class="item mdl-card mdl-shadow--4dp">
                <div class="obra-foto" style="background-image: url('https://conexaoparis.s3.amazonaws.com/wp-content/uploads/2007/06/909.jpg')">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Obra A</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sagittis pellentesque lacus eleifend lacinia...
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item mdl-card mdl-shadow--4dp">
                <div class="obra-foto" style="background-image: url('https://ogimg.infoglobo.com.br/in/10364026-b86-5bf/FT1500A/550/2013101455102.jpg')">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Obra B</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sagittis pellentesque lacus eleifend lacinia...
                </div>
            </div>
        </div>
    </div>

    <div class="mocs-obfuscator" v-show="openItemModal">
        <add-item class="zoonIn" @closeModalAdd="openItemModal = false"></add-item>
    </div>
</div>
    `,
    data: function () {
        return {
            searchText: '',
            openItemModal: false
        }
    },
    methods: {
        addItem: function(){
            this.openItemModal = true;
            $('#dashboard_main').addClass('noscroll');
        }
    }
});