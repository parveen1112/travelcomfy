describe("Testing TODOMVC", function () {

    var setText = function(text, selector) {
        var input = $(selector || '#new-todo');
        var e = $.Event("keypress");
        e.which = e.keyCode = 13;
        return input.val(text).trigger(e);
    };

    before(function() {
        window.localStorage.removeItem('todos-backbone', '');
        app.todos.reset();
    });

    it("Adding new TODOs", function () {
        setText('TODO A');
        setText('TODO B');
        expect($('#todo-list li').length).to.be.equal(2);
    });
    it("Deleting TODO", function () {
        $('#todo-list li:first-child .destroy').click();
        expect($('#todo-list li').length).to.be.equal(1);
    });
    it("Edit and add TODOs", function () {
        setText('A new TODO');
        $('#todo-list li:first-child').addClass('editing');
        setText('A new TODO', '#todo-list li:first-child .edit').blur();
        expect($('#todo-list li').length).to.be.equal(2);
        expect($('#todo-list li label').eq(0).text()).to.be.equal($('#todo-list li label').eq(1).text())
    });

});