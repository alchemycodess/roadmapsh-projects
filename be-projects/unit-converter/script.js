import express from "express"

const app = express()

app.use(express.urlencoded({ extended: true }))

app.post("/convertl", (req, res) => {
  const data =  req.body
  const lengthInFt = data.value
  const lengthFrom = data.from
  const lengthTo = data.to

    const lengthInCm = lengthInFt * 30.48

    res.send(`
        <h1>Result of your calculation</h1>
        <p>Result:${lengthInFt} ${lengthFrom} = ${lengthInCm} ${lengthTo}</p>
        <a href="http://localhost:5500/be-projects/unit-converter/">Go back</a>   
    `)
})

app.post("/convertw", (req, res) => {
    const data = req.body
    const weightInGm = data.value
    const weightFrom = data.from
    const weightTo = data.to

    const weightInKg = weightInGm/1000

    res.send(`
        <h1>Result of your calculation</h1>
        <p>Result:${weightInGm} ${weightFrom} = ${weightInKg} ${weightTo}</p>
        <a href="http://localhost:5500/be-projects/unit-converter/">Go back</a>   
    `)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})