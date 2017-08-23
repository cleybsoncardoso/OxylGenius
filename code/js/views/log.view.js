Vue.component('log-view', {
    template: `
    <div id="log-view" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__supporting-text">
            <h5 v-show="!logsObra.length">Não há logs disponíveis</h5>
            <table>
            <tr>
              <th>Data</th>
              <th>Obra</th>
              <th>Funcionário</th>
              <th>Operação</th>
            </tr>
            <tr v-for="log in logsObra" style="text-align: right">
              <td>{{log.DataAlteracao}}</td>
              <td>{{log.nome}}</td>
              <td>{{log.Nome}}</td>
              <td>{{log.conteudo}}</td>              
            </tr>
          </table>
        </div>
    </div>
    `,
    data: function () {
        return {
            logsObra: []
        }
    },
    methods: {
        getLogs: function () {
            var t = this;
            let token = localStorage.getItem("token");
            $.post(URL_API + 'log', { token: token })
            .done(function (log) {
                t.logsObra = log.obra;
                console.log(log.obra);
            }).fail(function (error) {
                console.log(error);
            });
        }
    },
    created: function () {
        this.getLogs();
    }
});
