import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { getBlogById, addComment, getAllBlogs, createBlog, deleteBlog, getCommentsByBlog, updateBlog } from '../controller/blog.js'

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()} - ${file.originalname}`
      cb(null, fileName)
    },
})

const upload = multer( { storage: storage})

router.get('/', getAllBlogs)

router.get('/:id', getBlogById)

router.post('/comment/:blogId', addComment)

router.get('/comment/:blogId', getCommentsByBlog)

router.put('/:id', updateBlog)

router.post('/', upload.single('coverImage'), createBlog)

router.delete('/:id', deleteBlog)

export default router;