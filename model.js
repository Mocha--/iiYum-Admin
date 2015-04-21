//get all the categories 

"use strict"

var HOST = "http://localhost/iiYum-Backend/ciadmin/index.php"

var Category = Backbone.Model.extend({

	defaults : {
		categroy_id : "",
		image : "",
		parent_id : "",
		top : "",
		column : "",
		sort_order : "",
		status : "",
		date_added : "",
		date_modified : "",
		language_id : "",
		name: "",
		description : "",
		meta_description : "",
		meta_keyword : ""
	}

})

var CategoryCollection = Backbone.Collection.extend({

	model : Category,
	url : HOST + "/product/getcategories"
})


//get all the products in the same category
var Product = Backbone.Model.extend({

	defaults : {
		product_id : "",
		categroy_id : "",
		product_name : "",
		product_price : "",
		category_name : "",
		product_sort_order : "",
		product_status : "",
		product_model : ""
	}
})

var ProductCollection = Backbone.Collection.extend({

	model : Product,
	url : "http://localhost/php/iiyum/ciadmin/index.php/product/getproductsbycategoryid/?category_id="

})

//get a single product
var Single = Backbone.Model.extend({
	//urlRoot : 'http://localhost/php/iiyum/ciadmin/index.php/product/singleproduct/?model=100&language_id=1',

	defaults : {
		model : "",
		product_id : "",
		price : "",
		name : "",
		category_name : "",
		categroy_id : ""
	}
})

var SingleCollection = Backbone.Collection.extend({

	model : Single,
	url : "http://localhost/php/iiyum/ciadmin/index.php/product/singleproduct/?model="

})