// view.js

// use strict mode
"use strict"

var ContainerView = Backbone.View.extend({
    "el": $("#container"),

    initialize: function(view) {
        this.render(view)
    },

    render: function(view) {
        this.$el.html(view)
        return this
    }
})

var CategoryListView = Backbone.View.extend({
    "el": $("#pageContent"),
    "collection": {},
    "template": {},

    initialize: function() {
        console.log(this.el)
        this.template = _.template($("#categoryListTemplate"))
        this.listenTo(this.collection, "change", this.render)
    },

    render: function() {
        var liList = []
        this.collection.each(function(item) {
            var templateVars = {
                "category_name": item
            }
            this.liList.push(this.liTemplate(templateVars))
        }, this)

        for (var li in liList) {
            this.$el.append(li)
        }

        return this
    }

})
