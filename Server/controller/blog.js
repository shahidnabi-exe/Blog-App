import Blog from '../models/blog.js'
import Comment from '../models/comment.js'

export const createBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { title, body } = req.body

        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required" })
        }

        const blog = await Blog.create({
            title,
            body,   
            createdBy: req.user._id,
            coverImageURL: req.file ? req.file.path : null
        })

        return res.status(201).json({
            message: "Blog created",
            blog
        })
    } catch (err) {
        return res.status(500).json({ message: "Blog creation failed" })
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('createdBy', 'name profileImgURL')
            .sort({ createdAt: -1 })

        return res.json(blogs)
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch blogs" })
    }
}

/**
 * Get Single Blog
 */
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('createdBy', 'name profileImgURL')

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        const comments = await Comment.find({ blogId: blog._id })
            .populate('createdBy', 'name profileImgURL')
            .sort({ createdAt: -1 })

        return res.json({ blog, comments })
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch blog" })
    }
}

/**
 * Add Comment
 */
export const addComment = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { content } = req.body
        const { blogId } = req.params

        if (!content) {
            return res.status(400).json({ message: "Comment required" })
        }

        const comment = await Comment.create({
            content,
            blogId,
            createdBy: req.user._id
        })

        return res.status(201).json({
            message: "Comment added",
            comment
        })
    } catch (err) {
        return res.status(500).json({ message: "Comment failed" })
    }
}

export const getCommentsByBlog = async (req, res) => {
    try {
        const { blogId } = req.params

        const comments = await Comment.find({ blogId })
            .populate('createdBy', 'name profileImgURL')
            .sort({ createdAt: -1 })

        return res.json({ comments })
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch comments" })
    }
}


/**
 * Delete Blog (owner only)
 */
export const deleteBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        if (blog.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: "Forbidden" })
        }

        await blog.deleteOne()

        return res.json({ message: "Blog deleted" })
    } catch (err) {
        return res.status(500).json({ message: "Delete failed" })
    }
}
export const updateBlog = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, body } = req.body;
    blog.title = title || blog.title;
    blog.body = body || blog.body;
    await blog.save();

    return res.json({ message: "Blog updated", blog });
  } catch (err) {
    return res.status(500).json({ message: "Update failed" });
  }
}