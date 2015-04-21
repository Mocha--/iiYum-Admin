// view.js

// use strict mode
"use strict"

var CategoryListView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template($("#categoryListTemplate").html())
        this.listenTo(this.collection, "fetch", this.render)
    },

    render: function() {
        this.$el.html(this.template({
            list : this.collection.toJSON()
        }))
    }
})

var ProductListView = Backbone.View.extend({

    initialize: function() {
        this.template = _.template($("#productListTemplate").html())
        this.listenTo(this.collection, "fetch", this.render)
    },

    render: function() {
        this.$el.html(this.template({
            list : this.collection.toJSON()
        }))
    }
})

