const { Router } = require('express')
const multer = require('multer')

const { getBlogById, addComment, getAllBlogs, createBlog, deleteBlog } = require('../controller/blog')

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

router.post('/', upload.single('coverImage'), createBlog)

router.delete('/:id', deleteBlog)

export default router;