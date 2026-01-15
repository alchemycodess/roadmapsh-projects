import axios from "axios";
import express, { response } from "express"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import { createClient } from "redis";

dotenv.config()
const app = express()
const port = 3000;

const redisClient = createClient()

redisClient.on("error", (err) => {
    console.log("Redis error", err)
})

await redisClient.connect()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(limiter)

app.get("/weather", async (req, res) => {
    const city = req.query.city

    if(!city) {
        return res.status(400).json({message: "City is required."})
    }

    const cacheKey = `weather:${city}`
    const cacheData = await redisClient.get(cacheKey)

    if(cacheData) {
        return res.json(JSON.parse(cacheData))
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}&unitGroup=metric`
    
    try {
        console.log("FROM API")
        const response = await axios.get(url)

        const dataToCache = {
            city,
            temperature: response.data.currentConditions.temp
        }

        await redisClient.set(
            cacheKey,
            JSON.stringify(dataToCache),
            {EX: 60 * 60 * 12}
        )
        
        return res.json(dataToCache)
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch weather data"})
    }
    
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})