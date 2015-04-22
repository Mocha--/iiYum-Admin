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

    var action = ""

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
                action = "forward"
            })

            if (action == "back") {
                mainView.router.back({
                    url: "",
                    reload: false,
                    ignoreCache: false
                })
            }

        },

        categoryList: function() {
            $("#backLink").click(function() {
                action = "back"
            })

            $(".categoryList").click(function() {
                action = "forward"
            })

            if (action == "forward") {
                mainView.router.load({
                    url: 'html/categoryList.html',
                    reload: false,
                    ignoreCache: false
                })

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
            } else {
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

            }
        },

        categoryDetail: function(categoryId) {
            $("#backLink").click(function() {
                action = "back"
            })
            if (action == "forward") {
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
            }
        },

    })

    var router = new Router()

    Backbone.history.start()

})
