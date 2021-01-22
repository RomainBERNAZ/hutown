import Photograph from '../models/photographModel'
import router from './productRoute';


router.get('/', async (req, res) =>{
    const photographs = await Photograph.find({});
    res.send(photographs);
})

export default router;