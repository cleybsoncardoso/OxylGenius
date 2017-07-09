Vue.component('ripple', {
    props: ['state'],
    template: `
        <div id="ripple" class="ripple fadeInRipple">
            <spinner v-show="state == 'loading'"></spinner>
            <div v-show="state != 'loading'">
                 <i style="font-size: 2em" class="mdl-color-text--white material-icons">done</i>
            </div>
        </div>
    `,
    created: function () {
        this.$nextTick(() => {
            if (this.state == 'loading') {
                $('#ripple').addClass('mdl-color--red-400');
                $('#ripple').removeClass('mdl-color--green-600');
            } else {
                $('#ripple').addClass('mdl-color--green-600');
                $('#ripple').removeClass('mdl-color--red-400');
            }
        });
    },
    watch: {
        state: function (value) {
            if (this.state == 'loading') {
                $('#ripple').addClass('mdl-color--red-400');
                $('#ripple').removeClass('mdl-color--green-600');
            } else {
                $('#ripple').addClass('mdl-color--green-600');
                $('#ripple').removeClass('mdl-color--red-400');
            }
        }
    },
});