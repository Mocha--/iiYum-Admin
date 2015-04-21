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
        "category_back" : "category_back",
        "category/:categoryId": "categoryDetail",
        "category/:categoryId/:productId": "productDetail"
    },

    categoryList: function() {

        mainView.router.load({
                url:'html/categoryList.html',
                reload:false,
                ignoreCache:false
            });

        app.onPageBeforeInit('category', function (page) {

            $('#categoryList').html('');
            var categoryCollection = new CategoryCollection() 

            var categoryListView = new CategoryListView({
                "el": $("#categoryList"),
                "collection": categoryCollection
            })

            categoryCollection.fetch({
                success : function(collection, resp) {
                    collection.trigger('fetch');
                }
            })
        })
    },

    categoryDetail: function(categoryId){
        mainView.router.load({
                url:'html/productList.html',
                reload:false,
                ignoreCache:false
            });

        app.onPageBeforeInit('product', function (page) {

            $('#productList').html('');
            var productCollection = new ProductCollection() 
            productCollection.url += categoryId
            console.log(productCollection.url)

            var productListView = new ProductListView({
                "el": $("#productList"),
                "collection": productCollection
            })

            productCollection.fetch({
                success : function(collection, resp) {
                    collection.trigger('fetch');
                }
            })
        })
    },
/*
    category_back: function(){

        mainView.router.back({
                url:'html/categoryList.html',
                reload:false,
                ignoreCache:false
            });
            App.onPageBack('category_list', function (page) {
                myApp.mainView.loadPage('');
            });
    }

    /*
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
    }*/
})

var router = new Router()

Backbone.history.start()
