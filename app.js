// router.js

// use stict mode
"use stict"

var app = new Framework7({
    "router": false
})

var mainView = app.addView(".view-main", {
    "dynamicNavbar": true
})

var Router = Backbone.Router.extend({

    "routes": {
        "": "main",
        "category": "categoryList",
        "category/:categoryId": "categoryDetail",
        "category/:categoryId/:productId": "productDetail"
    },

    main: function() {
        $("#categoryLink").click(function() {
            console.log($("#mainView").html())
            $("#mainView").html()

            mainView.router.load({
                "url": "html/categoryList.html"
            })
            console.log($("#mainView").html())
                //mainView.router.reloadPage("html/categoryList.html")
        })

    },

    categoryList: function() {

        var categoryCollection = new CategoryCollection()
        var categoryListView = new CategoryListView({
            "collection": categoryCollection
        })
        var containerView = new ContainerView(categoryListView)

        categoryCollection.fetch()
    },

    categoryDetail: function(category_id) {
        var productcollection = new ProductCollection()
        productcollection.url += category_id
        productcollection.fetch({
            success: function(collection, res) {
                var productListView = new ProductListView({
                    "collection": productcollection
                })
            }
        })

    },

    productDetail: function(category_id, model_id) {
        var product = new SingleCollection()
        product.url += (model_id + "&language_id=1")
        product.fetch({
            success: function(collection, res) {
                var singleproductview = new SingleView({
                    "collection": product
                })
            }
        })
    }
})

var router = new Router()

Backbone.history.start()
