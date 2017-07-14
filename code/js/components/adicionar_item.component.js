Vue.component('add-item', {
    template: `
    <div id="add-item" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
            <h2 class="mdl-card__title-text">Adicionar uma obra</h2>
        </div>
        <div class="mdl-card__supporting-text" style="width: 100%">
            <div class="row">
                <div class="col-sm-4" style="margin-bottom: 24px">
                    <label for="image-input" class="enviar-imagem mdl-button mdl-js-button mdl-button--raised">
                        Enviar imagem
                    </label>
                    <input id="image-input" type="file" @change="handleUpload"/>
                    <div class="imagem-preview">
                        <div v-show="imagem" class="imagem-content" v-bind:style="{ backgroundImage: 'url(' + imagem + ')' }">
                        </div>
                        <button v-on:click="removeFoto()" id="remove-foto" v-show="imagem" class="remove-foto mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-button--raised">
                            <i class="material-icons">close</i>
                        </button>
                        <div class="mdl-tooltip" data-mdl-for="remove-foto">Remover foto</div>
                        <div class="mdl-color-text--red-500" style="text-aling: center;text-transform: uppercase;margin-top: 16px">{{error.message}}</div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="titulo" type="text" id="obraNome">
                        <label class="mdl-textfield__label" for="obraNome">Título da obra</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <textarea class="mdl-textfield__input" v-model="descricao" type="text" rows= "3" id="obraDescricao" ></textarea>
                        <label class="mdl-textfield__label" for="obraDescricao">Descrição da obra</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="mdl-card__actions mdl-card--border" style="display: flex">
            <a v-on:click="close()" class="mdl-button mdl-js-button">
                Cancelar
            </a>
            <div style="flex-grow: 1"></div>
            <a id="add-obra-button" :disabled="!valido()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Adicionar Obra
            </a>
        </div>
    </div>
    `,
    data: function () {
        return {
            imagem: "",
            titulo: "",
            descricao: "",
            error: {
                type: 'success',
                message: ''
            }
        }
    },
    methods: {
        handleUpload: function (e, clear) {
            var files = e.target.files;
            var reader = new FileReader();

            var tipos = ['png', 'jpeg', 'jpg', 'gif'], permitido = false;
            var extensao = files[0].type.split('/')[1];

            tipos.map((value) => {
                permitido = value == extensao ? true : permitido;
            });

            if (permitido) {
                reader.addEventListener('load', () => {
                    this.imagem = reader.result;
                    this.error.message = "";
                });
                reader.readAsDataURL(files[0]);
            } else {
                this.error.message = "Formato de imagem inválido";
                this.removeFoto();
            }
        },
        removeFoto: function () {
            this.imagem = "";
            document.getElementById('image-input').value = "";
        },
        valido: function(){
            return this.imagem && this.titulo && this.descricao ? true : false;
        },
        close: function(){
            this.$emit('closeModalAdd');
            $('#dashboard_main').removeClass('noscroll');
        }
    },
    created: function () {
        this.$emit('noscroll');
    }
});