import express from 'express'
import Product from '../models/productModel.js'

const router = express.Router();

router.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

router.get('/products/:id', async (req, res) => {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)){
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
} else {    
    res.status(404).send({ message: 'Id du produit ne passe pas' });
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
        image: req.body.image, 
        price:{
            Small: req.body.price.Small,
            Medium: req.body.price.Medium,
        }, 
        size:{
            Small: req.body.size.Small,
            Medium: req.body.size.Medium,
        }, 
        description: req.body.description,
        artiste: req.body.artiste
    }); 
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send( { message: 'Nouveau produit créé', data: newProduct})
    }
    return res.status(500).send({ message: 'Erreur dans la création du produit'})
})
 
export default router;