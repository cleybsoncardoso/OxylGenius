Vue.component('log-view', {
    template: `
    <div id="log-view" class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__supporting-text">
            <h5 v-show="!logsObra.length">Não há logs disponíveis</h5>
            <table>
            <tr>
              <th>Month</th>
              <th>Savings</th>
            </tr>
            <tr>
              <td>January</td>
              <td>$100</td>
            </tr>
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
