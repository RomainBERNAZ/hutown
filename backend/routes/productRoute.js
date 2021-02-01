import express from 'express'
import Product from '../models/productModel'

const router = express.Router();

router.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

router.get('/products/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  });

router.delete('/products/:id', async (req,res) => {
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({message: "Produit supprimé"})
    }else{
        res.send('erreur dans la suppression')
    }
})

router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }); 
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send( { message: 'Nouveau produit créé', data: newProduct})
    }
    return res.status(500).send({ message: 'Erreur dans la création du produit'})
})


export default router;