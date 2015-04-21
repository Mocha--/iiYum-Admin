// router.js

// use stict mode
"use stict"

$(document).ready(function() {
    var app = new Framework7({
        "router": false
    })

    var mainView = app.addView(".view-main", {
        "dynamicNavbar": true
    })

    var Router = Backbone.Router.extend({

        "routes": {
            "": "categoryList",
            "category/:categoryId": "categoryDetail",
            "category/:categoryId/:productId": "productDetail"
        },

        categoryList: function() {
            mainView.router.load({
                "url": "html/categoryList.html"
            })

            app.onPageInit("category", function(page) {
                var categoryCollection = new CategoryCollection()
                var categoryListView = new CategoryListView({
                    "el": $("#categoryList"),
                    "collection": categoryCollection
                })
                categoryCollection.fetch({
                    success: function(collection, res) {
                        collection.trigge("fetch")
                    }
                })
            })
        }
    })

    var router = new Router()

    Backbone.history.start()

})
