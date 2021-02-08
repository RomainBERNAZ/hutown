import Page from '../models/pageModel.js'
import express from 'express'


const router = express.Router();

router.get("/pages", async (req, res) => {
  console.log("dans la route pages");
    const pages = await Page.find({});
    res.send(pages);
})

router.put('/pages/:id', async (req, res) => {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);
    if (page) {
      page.title = req.body.title;
      page.category = req.body.category;
      page.description = req.body.description;
      const updatedPage = await page.save();
      if (updatedPage) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedPage });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

router.post('/pages', async (req, res) =>{
    const page = new Page({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });
    const newPage = await page.save();
    if(newPage){
        return res.status(201).send( { message: 'Nouvelle page créée', data: newPage})
    }
    return res.status(500).send({ message: 'Erreur dans la création du produit'})
})


export default router;