Vue.component('log-view', {
    template: `
        <table class="table">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Obra</th>
                    <th>Tipo</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="logObra in logsObra">
                    <th>{{logObra.Nome}}</th>
                    <td>{{logObra.nome}}</td>
                    <td>{{logObra.conteudo}}</td>
                    <td>{{logObra.DataAlteracao}}</td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            searchText: '',
            logsObra: [],
            logsFuncionario: []
        }
    },
    methods: {
    },
    created: function () {
        logs((log) => {
            this.logsObra = log.obra;
            this.logsFuncionario = log.funcionario;
            console.log(this.logsObra);
        });

    }
});

function logs(callBack) {
    let token = localStorage.getItem("token");
    $.post(URL_API + 'log', { token: token })
        .done(function (data) {
            console.log(data);
            callBack(data);
        }).fail(function (error) {
            console.log(error);
        });
}