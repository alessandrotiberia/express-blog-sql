import express from 'express';

import { index, show, destroy, store, update } from '../controllers/posts-controllers.js';
import validatePost from '../middleware/validatePost.js';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.delete ('/:id', destroy),
router.post ('/',validatePost, store);
router.put('/:id', validatePost, update);
export default router;