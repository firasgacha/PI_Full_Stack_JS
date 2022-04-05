var {Product,Categorie,Image}=require('../models/product');


exports.getproductsjson=async function (request, result) {
    Product.find(function (error,d_product){
        if(error)
            throw error;
        result.json(d_product)
    });
}
exports.getproducts=async function (request, result) {
    Product.find(function (error,d_product){
        if(error)
            throw error;
        result.render("Afficherproducts.twig",{d_product});
    });
}