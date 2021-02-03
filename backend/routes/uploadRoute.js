import express from 'express'
import cloudinary from '../cloudinary'


const router = express.Router();

router.get('/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .sort_by('public_id', 'desc')
        .max_results(100)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

router.get('/imagesShop', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('hutownshop')
        .sort_by('public_id', 'desc')
        .max_results(100)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

router.post('/destroy', (req, res) =>{
    try {
        const public_id = req.body.imageId;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.api.delete_resources([public_id], async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})
router.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ml_default',
            folder: req.body.cat
        });
        console.log(uploadResponse);
        res.json({ msg: 'yay' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.post('/uploadShop', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ml_default',
            folder: 'hutownshop',
            overwrite:true,
            public_id: req.body.id
        });
        console.log(uploadResponse);
        res.json({ msg: 'yay' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

export default router;