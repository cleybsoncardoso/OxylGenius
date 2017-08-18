Vue.component('add-item', {
    props: ['item'],
    template: `
    <div id="add-item" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
            <h2 class="mdl-card__title-text">
                <span v-show="item">Editar obra</span>
                <span v-show="!item"> Adicionar uma obra</span>
            </h2>
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
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" v-model="nome" type="text" id="obraNome" ></textarea>
                                <label class="mdl-textfield__label" for="obraNome">Nome da obra</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" v-model="numeroInventario" type="number" id="obraNumeroInventario" ></textarea>
                                <label class="mdl-textfield__label" for="obraNumeroInventario">Numero no Inventário</label>
                            </div>
                        </div>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="titulo" type="text" id="obraTitulo">
                        <label class="mdl-textfield__label" for="obraTitulo">Título da obra</label>
                    </div>
                    <label class="mdl-radio mdl-js-radio" for="obraAtiva">
                        <input type="radio" id="obraAtiva" class="mdl-radio__button" name="status" checked>
                        <span class="mdl-radio__label">Obra Ativa</span>
                    </label>
                    <label class="mdl-radio mdl-js-radio" for="obraInativa">
                        <input type="radio" id="obraInativa" class="mdl-radio__button" name="status">
                        <span class="mdl-radio__label">Obra Inativa</span>
                    </label>
                    <div class="mdl-textfield mdl-js-textfield">
                        <textarea class="mdl-textfield__input" v-model="marcas" type="text" rows= "2" id="obraMarcas" ></textarea>
                        <label class="mdl-textfield__label" for="obraMarcas">Marcas e Inscrições</label>
                    </div>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="colecao" type="text" id="obraColecao">
                    <label class="mdl-textfield__label" for="obraColecao">Coleção</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="funcao" type="text" id="obraFuncao">
                    <label class="mdl-textfield__label" for="obraFuncao">Função</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="procedencia" type="text" id="obraProcedencia">
                    <label class="mdl-textfield__label" for="obraProcedencia">Procedência</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="estado" type="text" id="obraEstado">
                    <label class="mdl-textfield__label" for="obraEstado">Estado de conservação</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="historico" type="text" rows= "3" id="obraHistorico" ></textarea>
                    <label class="mdl-textfield__label" for="obraHistorico">Histórico</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="descricao" type="text" rows= "3" id="obraDescricao" ></textarea>
                    <label class="mdl-textfield__label" for="obraDescricao">Descrição</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="iconologia" type="text" id="obraIconologia">
                    <label class="mdl-textfield__label" for="obraIconologia">Iconologia</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="referencias" type="text" rows= "3" id="obraReferencias" ></textarea>
                    <label class="mdl-textfield__label" for="obraReferencias">Referências</label>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="formaAquisicao" type="text" id="obraFormaAquisicao">
                    <label class="mdl-textfield__label" for="obraFormaAquisicao">Forma de Aquisição</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="dataAquisicao" type="text" id="obraDataAquisicao">
                    <label class="mdl-textfield__label" for="obraDataAquisicao">Data de Aquisição</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="autorAquisicao" type="text" id="obraAutorAquisicao">
                    <label class="mdl-textfield__label" for="obraAutorAquisicao">Autor da Aquisição</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="observacoes" type="text" rows= "2" id="obraObservacoes"></textarea>
                    <label class="mdl-textfield__label" for="obraObservacoes">Observações</label>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="materiais" type="text" id="obraMateriais">
                    <label class="mdl-textfield__label" for="obraMateriais">Materiais Constitutivos</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="tecnica" type="text" id="obraTecnica">
                    <label class="mdl-textfield__label" for="obraTecnica">Técnica de fabricação</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="autoria" type="text" id="obraAutoria">
                    <label class="mdl-textfield__label" for="obraAutoria">Autoria</label>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="altura" type="text" id="obraAltura">
                        <label class="mdl-textfield__label" for="obraAltura">Altura</label>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="largura" type="text" id="obraLargura">
                        <label class="mdl-textfield__label" for="obraLargura">Largura</label>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="comprimento" type="text" id="obraComprimento">
                        <label class="mdl-textfield__label" for="obraComprimento">Comprimento</label>
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
                <span v-show="item">Salvar obra</span>
                <span v-show="!item">Adicionar Obra</span>
            </a>
        </div>
    </div>
    `,
    data: function () {
        return {
            imagem: "",
            nome: "",
            numeroInventario: "",
            titulo: "",
            marcas: "",
            colecao: "",
            funcao: "",
            procedencia: "",
            descricao: "",
            historico: "",
            iconologia: "",
            estado: "",
            referencias: "",
            formaAquisicao: "",
            dataAquisicao: "",
            autorAquisicao: "",
            observacoes: "",  
            materiais: "",
            tecnica: "",
            autoria: "",
            altura: "",
            largura: "",
            comprimento: "",  
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
        valido: function () {
            return this.imagem && this.titulo && this.descricao ? true : false;
        },
        close: function () {
            this.imagem = "";
            this.titulo = "";
            this.descricao = "";
            this.item = "";
            this.$emit('closeModalAdd');
            $('#add-item .mdl-textfield').removeClass('is-dirty');
            $('#dashboard_main').removeClass('noscroll');
        }
    },
    watch: {
        item: function () {
            if (this.item) {
                this.imagem = this.item.imagem;
                this.titulo = this.item.titulo;
                this.descricao = this.item.descricao;
                $('#add-item .mdl-textfield').addClass('is-dirty');
            }
        }
    },
    created: function () {
    }
});