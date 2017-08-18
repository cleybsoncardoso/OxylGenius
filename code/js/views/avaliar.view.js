Vue.component('avaliar-view', {
    template: `
    <div id="avaliar-view" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <h5 class="mdl-color-text--grey-700" style="margin: 0">Fazer avaliação</h5>
        </div>

        <div class="mdl-card__supporting-text">
            <row>
                <input type="radio" name="gender" value="1" v-model="avaliacao.Nota"> 1
                <input type="radio" name="gender" value="2" v-model="avaliacao.Nota"> 2
                <input type="radio" name="gender" value="3" v-model="avaliacao.Nota"> 3
                <input type="radio" name="gender" value="4" v-model="avaliacao.Nota"> 4
                <input type="radio" name="gender" value="5" v-model="avaliacao.Nota"> 5
            </row>
        </div>
        <div class="mdl-card__actions mdl-card--border" style="display: flex">
            <div style="flex-grow: 1"></div>
            <a @click="enviar" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Avaliar
            </a>
        </div>
    </div>
    `,
    data: function () {
        return {
            avaliacao: {}
        }
    },
    methods: {
        enviar: function () {
            if (!this.avaliacao.Nota) {
                $.toast('Escolha a nota');           
            } else {
                this.avaliacao.token = localStorage.getItem("token");
                $.post(URL_API + 'avaliar', this.avaliacao)
                .done(function (data) {
                    if (data) {
                        $.toast('Avaliado com sucesso');                        
                    } else {
                        $.toast('Erro ao avaliar')                        
                    }
                    
                }).fail(function (error) {
                    $.toast('Erro ao avaliar')                        
                });
            }
            console.log(this.avaliacao);
        }
    }
});