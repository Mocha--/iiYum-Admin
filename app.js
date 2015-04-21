// router.js

// use stict mode
"use stict"

var app = new Framework7()

var Router = Backbone.Router.extend({

    "routes": {
        "": "categoryList",
        "category/:categoryId": "categoryDetail",
        "category/:categoryId/:productId": "productDetail"
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
