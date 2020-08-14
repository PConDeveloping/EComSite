import express from 'express';
import Product from '../models/productModel'
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
        const products = await Product.find({});
        res.send(products);
});

router.get("/:id", async (req, res) => {
        const product = await Product.findOne({_id: req.params.id});
        if(product){
                res.send(product);
        }else{
                res.status(404).send({message:"Product not found"})
        }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
        const product = new Product({
                name: req.body.name,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock,
                description: req.body.description,
                
        })
        console.log({product})
        const newProduct = await product.save();
        if(newProduct){
                res.status(201).send({message: 'New Product Created', data: newProduct });
        }
        return res.status(500).send({message: 'Error in Creating Product.'})
})

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
        const deletedProduct = await Product.findById(req.params.id);
        if (deletedProduct) {
          await deletedProduct.remove();
          res.send({ message: "Product Deleted" });
        } else {
          res.send("Error in Deletion.");
        }
      });


router.put("/:id", async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById({_id: productId});
        if(product){
                product.image= req.body.image;
                product.brand= req.body.brand;
                product.name=req.body.name;
                product.price= req.body.price;
                product.category= req.body.category;
                product.stock= req.body.stock;
                product.description= req.body.description;
        

                console.log({product})
                const updatedProduct = await product.save();
                if(updatedProduct){
                        res.status(200).send({message: 'New Product Updated', data: updatedProduct });
                }
                return res.status(500).send({message: 'Error in Updating Product.'})
        }
})




export default router;