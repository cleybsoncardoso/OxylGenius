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
                                <input class="mdl-textfield__input" v-model="obra.nome" type="text" id="obraNome" ></textarea>
                                <label class="mdl-textfield__label" for="obraNome">Nome da obra</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" v-model="obra.titulo" type="text" id="obraTitulo">
                                <label class="mdl-textfield__label" for="obraTitulo">Título da obra</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" v-model="obra.n_no_inventario" type="number" id="obran_no_inventario" ></textarea>
                                <label class="mdl-textfield__label" for="obran_no_inventario">Numero no Inventário</label>
                            </div>
                            <label class="mdl-switch mdl-js-switch" for="obraEstadoAtivo">
                                <input type="checkbox" id="obraEstadoAtivo" class="mdl-switch__input" v-model="obra.estadoAtivo">
                                <span class="mdl-switch__label">Obra Ativa</span>
                            </label>
                        </div>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield">
                        <textarea class="mdl-textfield__input" v-model="obra.descricao" type="text" rows= "3" id="obraDescricao" ></textarea>
                        <label class="mdl-textfield__label" for="obraDescricao">Descrição</label>
                    </div>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="obra.marcas" type="text" rows= "2" id="obraMarcas" ></textarea>
                    <label class="mdl-textfield__label" for="obraMarcas">Marcas e Inscrições</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.colecao" type="text" id="obraColecao">
                    <label class="mdl-textfield__label" for="obraColecao">Coleção</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.funcao" type="text" id="obraFuncao">
                    <label class="mdl-textfield__label" for="obraFuncao">Função</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.procedencia" type="text" id="obraProcedencia">
                    <label class="mdl-textfield__label" for="obraProcedencia">Procedência</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.estado" type="text" id="obraEstado">
                    <label class="mdl-textfield__label" for="obraEstado">Estado de conservação</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="obra.historico" type="text" rows= "3" id="obraHistorico" ></textarea>
                    <label class="mdl-textfield__label" for="obraHistorico">Histórico</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="obra.iconologia" type="text" rows="3" id="obraIconologia"></textarea>
                    <label class="mdl-textfield__label" for="obraIconologia">Iconologia</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="obra.referencias" type="text" rows= "3" id="obraReferencias" ></textarea>
                    <label class="mdl-textfield__label" for="obraReferencias">Referências</label>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.Forma" type="text" id="obraForma">
                    <label class="mdl-textfield__label" for="obraForma">Forma de Aquisição</label>
                </div>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" v-model="obra.autor" type="text" id="obraautor">
                            <label class="mdl-textfield__label" for="obraautor">Autor da Aquisição</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" v-model="obra.dta" type="text" id="obradta">
                            <label class="mdl-textfield__label" for="obradta">Data de Aquisição</label>
                        </div>
                    </div>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <textarea class="mdl-textfield__input" v-model="obra.observacoes" type="text" rows= "2" id="obraObservacoes"></textarea>
                    <label class="mdl-textfield__label" for="obraObservacoes">Observações</label>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.material" type="text" id="obramaterial">
                    <label class="mdl-textfield__label" for="obramaterial">Materiais Constitutivos</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.tecnica" type="text" id="obraTecnica">
                    <label class="mdl-textfield__label" for="obraTecnica">Técnica de Fabricação</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" v-model="obra.autora" type="text" id="obraautora">
                    <label class="mdl-textfield__label" for="obraautora">Autoria</label>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="obra.Altura" type="text" id="obraAltura">
                        <label class="mdl-textfield__label" for="obraAltura">Altura</label>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="obra.Largura" type="text" id="obraLargura">
                        <label class="mdl-textfield__label" for="obraLargura">Largura</label>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" v-model="obra.Comprimento" type="text" id="obraComprimento">
                        <label class="mdl-textfield__label" for="obraComprimento">Comprimento</label>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" v-model="obra.fotografo" type="text" id="obraFotografo">
                            <label class="mdl-textfield__label" for="obraFotografo">Fotógrafo</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" v-model="obra.dataFoto" type="text" id="obraDataFoto">
                            <label class="mdl-textfield__label" for="obraDataFoto">Data</label>
                        </div>
                    </div>
                </div>
                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input"  v-model="obra.arquivoFoto" type="text" id="obraArquivoFoto">
                    <label class="mdl-textfield__label" for="obraArquivoFoto">Arquivo</label>
                </div>
            </div>
        </div>
        <div class="mdl-card__actions mdl-card--border" style="display: flex">
            <a v-on:click="close()" class="mdl-button mdl-js-button">
                Cancelar
            </a>
            <div style="flex-grow: 1"></div>
            <a v-on:click="cadastra()" id="add-obra-button" :disabled="!valido()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                <span v-show="item">Salvar obra</span>
                <span v-show="!item">Adicionar Obra</span>
            </a>
        </div>
    </div>
    `,
    var: obra = {
        imagem: "",
        nome: "",
        n_no_inventario: "",
        titulo: "",
        estadoAtivo: "",
        marcas: "",
        colecao: "",
        funcao: "",
        procedencia: "",
        descricao: "",
        historico: "",
        iconologia: "",
        estado: "",
        referencias: "",
        Forma: "",
        dta: "",
        autor: "",
        observacoes: "",  
        material: "",
        tecnica: "",
        autora: "",
        Altura: "",
        Largura: "",
        Comprimento: "",
        fotografo: "",
        dataFoto: "", 
        arquivoFoto: "",
        error: {
            type: 'success',
            message: ''
        }
    },
    data: function () {
        return obra;
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
        },
        cadastra: function () {
            $.post(URL_API + 'obra', this.obra)
                .done(function(data) {
                    if(obra == 404)
                        $.toast('Erro ao inserir a obra');
                    else {
                        close();
                        $.toast('Obra cadastrada com sucesso');
                    }
                })
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