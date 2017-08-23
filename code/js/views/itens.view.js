Vue.component('itens-view', {
    template: `
<div id="itens-view">
    <div id="seachbar" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <div class="mdl-textfield mdl-js-textfield" id="search-input">
                <input class="mdl-textfield__input" type="text" id="search" v-model="searchText" @keyup="filtro">
                <label class="mdl-textfield__label" for="search">Pesquisar por uma obra</label>
            </div>

            <button v-on:click="addItem()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Adicionar Item
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-4" v-for="obra in obras" style="padding-bottom: 16px" @click="open(obra)">
            <div class="item mdl-card mdl-shadow--4dp" >

                <div class="obra-foto" v-bind:style="{ backgroundImage: 'url(' + obra.linkFoto + ')' }">
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
            obras: [],
            obrasAux: []
            
        }
    },
    methods: {
        addItem: function () {
            this.openItemModal = true;
            $('#dashboard_main').addClass('noscroll');
        },
        open: function(obraAtual){
            obra = obraAtual;
            this.openItemModal = true;
            $('#dashboard_main').addClass('noscroll');
        },
        modalClosed: function () {
            this.selectedItem = '';
            this.openItemModal = false
        },
        filtro: function(){
            this.obras = this.obrasAux.filter(item=>{
                return item.nome.toUpperCase().indexOf(this.searchText.toUpperCase()) > -1
            });
        },
        getObras: function () {
            var t = this;
            $.get(URL_API + 'obra')
                .done(function (data) {
                    if (data != 404) {
                        data.map(item=>{
                            if(item.foto && item.foto.length > 0){
                                item.linkFoto = item.foto[0].linkFoto;
                            }
                        });
                        t.obras = data;
                        t.obrasAux = data;
                        console.log(data);
                    }
                }).fail(function (error) {
                });
        }
    },
    created: function () {
        this.getObras();
    }
});