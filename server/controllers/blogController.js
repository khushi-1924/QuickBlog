import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';

export const addBlog = async(req, res) => {
    try {
        const { title, subtitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are present
        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: 'Missing required fileds' });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to imageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // optimization through imageKit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},  // auto compression
                {format: 'webp'},   // convert to modern format
                {width: '1280'},    // width resize
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({ title, subtitle, description, category, image, isPublished });

        res.status(200).json({ success: true, message: 'Blog added successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
}

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogById = async(req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog Not Found' });
        }
        res.status(200).json({ success: true, message: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async(req, res) => {
    try {
        const { id } = req.body;
        
        await Blog.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Blog Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const togglePublish = async(req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.status(200).json({ success: true, message:'Blog status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}