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
            "": "main",
            "category": "categoryList",
            "category_back": "category_back",
            "category/:categoryId": "categoryDetail",
            "category/:categoryId/:productId": "productDetail"
        },

        main: function() {
            $("#categoryLink").click(function() {
                mainView.router.load({
                    url: 'html/categoryList.html',
                    reload: false,
                    ignoreCache: false
                })
            })

        },

        categoryList: function() {

            /*
                        mainView.router.load({
                            url: 'html/categoryList.html',
                            reload: false,
                            ignoreCache: false
                        })
            */

            app.onPageInit("category", function(page) {
                var categoryCollection = new CategoryCollection()
                var categoryListView = new CategoryListView({
                    "el": $("#categoryList"),
                    "collection": categoryCollection
                })
                categoryCollection.fetch({
                    success: function(collection, res) {
                        collection.trigger("fetch")
                    }
                })
            })
        },

        categoryDetail: function(categoryId) {
            mainView.router.load({
                url: 'html/productList.html',
                reload: false,
                ignoreCache: false
            });

            app.onPageBeforeInit('product', function(page) {

                $('#productList').html('');
                var productCollection = new ProductCollection()
                productCollection.url += categoryId
                console.log(productCollection.url)

                var productListView = new ProductListView({
                    "el": $("#productList"),
                    "collection": productCollection
                })

                productCollection.fetch({
                    success: function(collection, resp) {
                        collection.trigger('fetch');
                    }
                })
            })
        },

    })

    var router = new Router()

    Backbone.history.start()

})
