const express=require('express');
const router=express.Router();
const Product=require('../Models/Product');

/*
 Get all the products
    URL:http://127.0.0.1:5000/api/products
	REQUEST : GET
	METHOD : router.get()
	fields:no-fields
 */
router.get('/products',async (request,response)=>{
      try{
        let products=await Product.find();
        response.status(200).json(products);
      }
      catch (error){
          console.error(error);
         response.status(500).json({
             error:error.message
         });
      }
});

/*Get  a single  product
URL:http://127.0.0.1:5000/api/products/:id
    REQUEST : GET
METHOD : router.get()
fields:no-fields*/
router.get('/products/:id',async (request,response)=>{
   let productID=request.params.id;
    try{
        let products=await Product.findById(productID);
        response.status(200).json(products);
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            error:error.message
        });
    }
});

/*Create a  product
URL:http://127.0.0.1:5000/api/products
    REQUEST :POST
METHOD : router.post()
fields:name,image,price,quantity,info*/
router.post('/products',async (request,response)=>{
    let newProduct={
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };
    try{
        //if product is all ready exist
        let product=await Product.findOne({name:newProduct.name});
         if(product){
             return response.status(401).json({
                 msg:'Product id already exist'
             });
         }
         //save it to database
         product= new  Product(newProduct);
         product=await product.save();
        response.status(200).json({
            result:'Product creation success',
            product:product
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            error:error.message
        });
    }
});
/*
Update  a single  product
    URL:http://127.0.0.1:5000/api/products/:id
	REQUEST : PUT
	METHOD : router.PUT()
	fields:name,image,price,quantity,info
* */
router.put('/products/:id',async (request,response)=>{
    let productID=request.params.id;
    let updateProduct={
        name:request.body.name,
        image:request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    };
    try{
        //if product is all ready exist
        let product=await Product.findById(productID);
        if(!product){
            return response.status(401).json({
                msg:'Product id NOT exist'
            });
        }
        //UPDATE it to database
        product=await Product.findByIdAndUpdate(productID,{
              $set:updateProduct,

        },{new:true});
        response.status(200).json({
            result:'Product Update is success',
            product:product
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            error:error.message
        });
    }

});

/*
Delete a   product
URL:http://127.0.0.1:5000/api/products/:id
    REQUEST : Delete
METHOD : router.Delete()
fields:no-fields
*/
router.delete('/products/:id',async (request,response)=>{
    let productID=request.params.id;
       try{
        //if product is not exist
        let product=await Product.findById(productID);
        if(!product){
            return response.status(401).json({
                msg:'Product id NOT exist'
            });
        }
        //delete from  database
        product=await Product.findByIdAndDelete(productID);
        response.status(200).json({
            result:'Product Deletion is success',
            product:product
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            error:error.message
        });
    }
});


module.exports=router;