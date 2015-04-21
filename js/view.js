// view.js

// use strict mode
"use strict"

var CategoryListView = Backbone.View.extend({
    
    initialize: function() {
        console.log(this.el)
        this.template = _.template($("#categoryListTemplate").html())
        this.listenTo(this.collection, "fetch", this.render)
    },

    render: function() {
        this.$el.html(this.template({
            collection: this.collection.toJSON()
        }))
    }
})
