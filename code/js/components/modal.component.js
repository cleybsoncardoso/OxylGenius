Vue.component('modal', {
    template: `
<transition name="modal">
    <div class="card-view mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">
                <slot name="modal-title"></slot>
            </h2>
        </div>
        <div class="mdl-card__supporting-text">
            <slot name="modal-body"></slot>
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <slot name="modal-actions"></slot>
        </div>
    </div>
</transition>
    `
});