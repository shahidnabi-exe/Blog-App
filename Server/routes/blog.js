import { Router } from 'express'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import '../config/cloudinary.js'
import { getBlogById, addComment, getAllBlogs, createBlog, deleteBlog, getCommentsByBlog, updateBlog } from '../controller/blog.js'

const router = Router()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-app',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

router.get('/', getAllBlogs)

router.get('/:id', getBlogById)

router.post('/comment/:blogId', addComment)

router.get('/comment/:blogId', getCommentsByBlog)

router.put('/:id', updateBlog)

router.post('/', upload.single('coverImage'), createBlog)

router.delete('/:id', deleteBlog)

export default router;