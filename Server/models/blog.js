
const {Schema, model} = require('mongoose');

const blogSchema = new Schema(
    {
        title: {
            type: String,
            requied: true,
        },
        body: {
            type: String,
            requied: true,
        },
        coverImageURL: {
            type: String,
            requied: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);


const Blog = model("blog", blogSchema)

module.exports = Blog