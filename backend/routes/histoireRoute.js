import Histoire from '../models/histoireModel.js'
import express from 'express'


const router = express.Router();

router.get("/histoires", async (req, res) => {
    const histoire = await Histoire.find({});
    console.log('histoire dans la route', histoire);
    res.send(histoire);
})

router.put('/histoires', async (req, res) => {
    const histoire = await Histoire.find();
    if (histoire) {
      histoire.description = req.body.description;
      const updatedHistoire = await histoire.save();
      if (updatedHistoire) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedHistoire });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

router.post('/histoires', async (req, res) =>{
    const histoire = new Histoire({
        description: req.body.description,
    });
    const newHistoire = await histoire.save();
    if(newHistoire){
        return res.status(201).send( { message: 'Nouvelle page créée', data: newHistoire})
    }
    return res.status(500).send({ message: 'Erreur dans la création du produit'})
})


export default router;