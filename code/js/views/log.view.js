Vue.component('log-view', {
    template: `
    <div id="log-view" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__supporting-text">
            <h5 v-show="!logsObra.length">Não há logs disponíveis</h5>
            <table v-show="logsObra.length" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 100%">
                <thead>
                    <tr>
                        <th class="mdl-data-table__cell--non-numeric">Usuario</th>
                        <th class="mdl-data-table__cell--non-numeric">Obra</th>
                        <th class="mdl-data-table__cell--non-numeric">Tipo</th>
                        <th class="mdl-data-table__cell--non-numeric">Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="logObra in logsObra">
                        <th class="mdl-data-table__cell--non-numeric">{{logObra.Nome}}</th>
                        <td class="mdl-data-table__cell--non-numeric">{{logObra.nome}}</td>
                        <td class="mdl-data-table__cell--non-numeric">{{logObra.conteudo}}</td>
                        <td class="mdl-data-table__cell--non-numeric">{{logObra.DataAlteracao}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function () {
        return {
            searchText: '',
            logsObra: [],
            logsFuncionario: []
        }
    },
    methods: {
        getLogs: function () {
            let token = localStorage.getItem("token");
            var t = this;
            $.post(URL_API + 'log', { token: token })
                .done(function (log) {
                    if (log != 404) {
                        t.logsObra = log.obra;
                        t.logsFuncionario = log.funcionario;
                    }
                }).fail(function (error) {
                    console.log(error);
                });
        }
    },
    created: function () {
        this.getLogs();
    }
});
