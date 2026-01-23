import "dotenv/config";
import express, { response } from "express"
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

    // wait and get connection
    const connection = await db.getConnection();

   try {
    // start transaction on this connection coz this route is touching more than 1 table (posts, tags, post_tags) and keep the data as draft until we're sure everything works
    await connection.beginTransaction();

    // 1. inserting blog post first and it will be first kept in transaction
    const [postResult] = await connection.query(
        "INSERT INTO posts (title, content, category) VALUES (?, ?, ?)",
        [title, content, category]
    )

    // taking out the id from the just created post
    const postId = postResult.insertId;

    // looping through tags array from body and
    for(const tagName of tags) {
        // checking in tags table one tagName at a time if its name already present or not with tagName and saving the tagname which exists in existingtag
        const [existingTag] = await connection.query(
            "SELECT id FROM tags WHERE name = ?",
            [tagName]
        )

        let tagId;
        // checking if one of the tag exists or not in existing tag to get its id
        if(existingTag.length > 0) {
            tagId = existingTag[0].id
        // if the tag doesnt exist means if its new insert it and get its id
        } else {
            const [tagResult] = await connection.query(
                "INSERT INTO tags (name) VALUES (?)",
                [tagName]
            )
            tagId = tagResult.insertId
        }
        // now link ids of post and tags to each other in this table of post_tags
        await connection.query(
            "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
            [postId, tagId]
        )
    }

    // commit transaction
    await connection.commit()

    // response to the client
    return res.status(201).json({
        id: postId,
        title,
        content,
        category,
        tags
    })
   } catch (error) {
    // rollback if anything fails
    await connection.rollback()
    console.error(error)
    return res.status(500).json({message: "Something went wrong"})
   } finally {
    // release connection
    connection.release()
   }

})

// update blog post
app.put("/posts/:id", async(req, res) => {
    // 1. getting identity from url i.e id which is the identity of post that client expect us to update with the help of id and thats need to get extracted
    const id = req.params.id
    // taking values from body
    const { title, content, category } = req.body

    const connection = await db.getConnection();

    try {
        // getting post by checking id that we get from url
        const [rows] = await connection.query(
            "SELECT * FROM posts",
            [id]
        )

        // checking if the row exists if not return the req saying post didnt exists
        if(rows.length === 0) {
            return res.status(404).json({ message: "Post not found" })
        }

        const finalTitle = title ? title : rows[0].title 
        const finalContent = content ? content : rows[0].content
        const finalCategory = category ? category : rows[0].category

        await connection.query(
            "UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?",
            [finalTitle, finalContent, finalCategory, id]
            
        )

        const [updatedRows ] = await connection.query(
            "SELECT * FROM posts WHERE id = ?",
            [id]
        )

        const updatedPost = updatedRows[0]

        return res.status(200).json(updatedPost)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Something went wrong" })
    } finally {
        connection.release()
    }
    
})

// delete blog post
app.delete("/posts/:id", async(req, res) => {
    const id = req.params.id

    const connection = await db.getConnection()

    try {
        const [rows] = await connection.query(
            "SELECT id FROM posts WHERE id = ?",
            [id]
        )

        if(rows.length === 0) {
            return res.status(404).json({ message: "Blog post not found"})
        }

        await connection.query(
            "DELETE FROM posts WHERE id = ?",
            [id]
        )

        return res.status(200).json({ message: "Blog post deleted successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Something went wrong while deleting blog post" })
    } finally {
        connection.release()
    }
})

// get blog post
app.get("/posts/:id", async(req, res) => {
    const id = req.params.id;
    const connection = await db.getConnection()

    try {
        const [rows] = await connection.query(
            "SELECT * FROM posts WHERE id = ?",
            [id]
        )

        if(rows.length === 0) {
            return res.status(404).json({ message: "Blog post not found" })
        }

        return res.status(200).json(rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Something went wrong while getting a blog post" })
    } finally {
        connection.release()
    }
})

// get blog posts
app.get("/posts", async(req, res) => {
    const connection = await db.getConnection()

    try {
        const [rows] = await connection.query(
            "SELECT * FROM posts"
        )

        return res.status(200).json(rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Something went wrong while getting all blog posts" })
    } finally {
        connection.release()
    }
})
app.listen(port, () => {
    console.log(`server listening on port: ${port}`)
})