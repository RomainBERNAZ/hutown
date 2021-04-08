import Histoire from '../models/histoireModel.js'
import express from 'express'


const router = express.Router();

router.get("/histoires", async (req, res) => {
    const histoire = await Histoire.find({});
    console.log('histoire dans la route', histoire);
    res.send(histoire);
})

router.put('/histoires/:id', async (req, res) => {
    const histoireId = req.params.id;
    const histoire = await Histoire.findById(histoireId);
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


export default router;