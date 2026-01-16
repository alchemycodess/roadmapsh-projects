import "dotenv/config";
import express, { json } from "express"
import db from "./db.js";

const app = express()
const port = 3000
app.use(express.json())

// 1. create blog post
app.post("/posts", async (req, res) => {
    const {title, content, category, tags} = req.body
    
    if(!(title && content && category && tags)) {
        return res.status(400).json({message: "All fields are required"})
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [postResult] = await connection.query(
        "INSERT INTO posts (title, content, category) VALUES (?, ?, ?)",
        [title, content, category]
        );

        const postId = postResult.insertId;

         for (const tagName of tags) {
        // check if tag exists
        const [existingTag] = await connection.query(
            "SELECT id FROM tags WHERE name = ?",
            [tagName]
        );

        let tagId;

        if (existingTag.length > 0) {
            tagId = existingTag[0].id;
        } else {
            const [tagResult] = await connection.query(
            "INSERT INTO tags (name) VALUES (?)",
            [tagName]
        );
            tagId = tagResult.insertId;
        }

        await connection.query(
            "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
            [postId, tagId]
        );
        }

        await connection.commit();

        return res.status(201).json({
        id: postId,
        title,
        content,
        category,
        tags
        });


    } catch (error) {
        await connection.rollback();
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    } finally {
        connection.release();
    }

    
})

app.listen(port, () => {
    console.log(`server listening on port: ${port}`)
})