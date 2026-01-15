import axios from "axios";
import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = 3000;

app.get("/weather", async (req, res) => {
    const city = req.query.city

    if(!city) {
        return res.status(400).json({message: "City is required."})
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}&unitGroup=metric`
    
    try {
        const response = await axios.get(url)
        res.json({ city, temperature: response.data.currentConditions.temp })
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch weather data"})
    }
    
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})