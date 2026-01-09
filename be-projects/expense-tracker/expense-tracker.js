// expense tracker cli
/*
1. this should run from command lin
2. users can able to add expense with a decription and amount
- expense-tracker add --description "Lunch" --amount 20
3. user should ble to see th list
- expense-tracker list
ID  Date        Description Amount
1   2026-01-09  Lunch       $20
*/

const fs = require("fs")

function readTasks() {
    const fileData = fs.readFileSync("tasks.json", "utf-8")
    return JSON.parse(fileData)
}

function writeTasks(tasks) {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2))
}

command = process.argv[2]

// expense add feature
if(command === "add") {
    desKey = process.argv[3]
    desVal = process.argv[4]
    amntKey = process.argv[5]
    amntVal = process.argv[6]

    // validation
    if(desKey !== "--description" || amntKey !== "--amount") {
        console.log("Error: Use --description and --amount correctly.")
        return
    }

    if(!desVal || !amntVal) {
        console.log("Error: Description and amount are required.")
        return
    }

    const amountNumber = Number(amntVal)

    if(isNaN(amountNumber)) {
        console.log("Error: Amount must be a number.")
        return
    }

    if(amountNumber <= 0) {
        console.log("Error: Amount must be greater than 0.")
        return
    }

    const tasks = readTasks()

    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0

    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`

    const newTask = {
        id: lastId + 1,
        date: formattedDate,
        description: desVal,
        amount: amntVal
    }
    tasks.push(newTask)

    writeTasks(tasks)

    console.log(`Expense added successfully (ID: ${newTask.id})`)
}

// list feature
if(command === "list") {
    const tasks = readTasks()

    console.log("ID", "date     ", "desc  ", "amount")
    tasks.forEach(task => {
        console.log(`${task.id} ${task.date} ${task.description} $${task.amount}`)
    });
}

// delete feature
if(command === "delete") {
    idKey = process.argv[3]
    const id = Number(process.argv[4])

    const tasks = readTasks()

    const updatedTasks = tasks.filter(task => id != task.id)

    // validation
    if(updatedTasks.length === tasks.length) {
        console.log(`Error: Expense with ID ${id} not found`)
        return
    }

    writeTasks(updatedTasks)
    console.log(`Expense deleted successfully (ID: ${id})`)
}

// month feature
if(command === "summary" && process.argv[3] === "--month") {
    const val = Number(process.argv[4])

    // validation
    if(isNaN(val)) {
        console.log("Error: Month must be a number between 1 and 12")
        return
    }

    if(val < 1 || val > 12) {
        console.log("Error: Month must be between 1 and 12")
        return
    }

    const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
    ];

    const monthName = monthNames[val - 1];

    const tasks = readTasks()

    let total = 0;
    tasks.forEach(task => {
        const taskMonth = new Date(task.date).getMonth() + 1;
        if(val === taskMonth) {
            total += Number(task.amount)
        }
    })
    console.log(`Total expenses for ${monthName}: $${total}`)

    // expense summary
} else if(command === "summary") {
    const tasks = readTasks()

    let total = 0;
    tasks.forEach(task => {
        total += Number(task.amount)
    })
    console.log(`Total expenses: $${total}`)
}
