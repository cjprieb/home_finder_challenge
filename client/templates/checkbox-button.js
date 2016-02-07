Template.checkboxButton.rendered = function () {
    var customCheckbox = this.$(".checkbox-custom");
    this.$("[type=checkbox]").on("change", function() {
        customCheckbox.toggleClass("fa-check", this.checked, 0);        
    });
}