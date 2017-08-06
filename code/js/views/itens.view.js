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
        <div class="col-sm-4" v-for="obra in obras" style="padding-bottom: 16px">
            <div class="item mdl-card mdl-shadow--4dp" @click="openItem()">
                <div class="obra-foto" style="background-image: url('https://conexaoparis.s3.amazonaws.com/wp-content/uploads/2007/06/909.jpg')">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">{{obra.nome}}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    {{obra.descricao}}
                </div>
            </div>
        </div>
    </div>
    
    <div class="mocs-obfuscator" v-show="openItemModal">
        <add-item class="zoonIn" :item="selectedItem" @closeModalAdd="modalClosed"></add-item>
    </div>
</div>
    `,
    data: function () {
        return {
            searchText: '',
            openItemModal: false,
            selectedItem: '',
            obras: []
        }
    },
    methods: {
        addItem: function () {
            this.openItemModal = true;
            $('#dashboard_main').addClass('noscroll');
        },
        openItem: function () {
            this.selectedItem = {
                imagem: "https://conexaoparis.s3.amazonaws.com/wp-content/uploads/2007/06/909.jpg",
                titulo: "Obra A",
                descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris sagittis pellentesque lacus eleifend lacinia"
            }
            this.addItem();
        },
        modalClosed: function () {
            this.selectedItem = '';
            this.openItemModal = false
        },
        getObras: function () {
            var storage = new Storage(), t = this;
            $.get(URL_API + 'obra', storage.recuperar('token').token)
                .done(function (data) {
                    t.obras = data;
                }).fail(function (error) {
                });
        }
    },
    created: function () {
        this.getObras();
    }
});