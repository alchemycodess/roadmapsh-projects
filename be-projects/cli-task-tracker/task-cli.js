

/*
1. capture the cmnds
2. start one by one feature
*/

// 1. cli is the program which will run in terminal
// 2. whatever text input we write in the terminal, the terminal will sends this text input given by users to the cli(program) and the cli(program) will interprets the given input and respond with output which will be displayed on the terminal only.
// 3. creating basic cli structure means:
// - deciding how users will write commands in the terminal(format of command like user types >(task add "buy milk") )

// - deciding how the program(cli) will read those commands from termianl using positions (program recieves the positional arguments ) 
// > index 0 → "add"
// > index 1 → "buy milk"

// - deciding how the pogram(cli) will route each commands to the correct logic
// > routing happens (if the cmnd value is add => i should run the addTask logic)

// first take cmnds(ex: node task-cli add "buy milk") from terminal
// node js have built in place called process.argv, which saves input in the list like
/*
process.argv = [
    "node", node executable index 0
    "task-cli", program file index 1
    "add", cmnd index 2
    "buy milk" argument index 3
]
we can console it like const arg = process.argv => console.log("args: ",arg) u will receive list
*/
// node js automatically collects the terminal inputs in the process.argv in ordered list of strings
// to talk to files read text from it and write text to it we need a bridge similar to process.argv "fs" file system
// the files cannot talk directly, we need fs that tells os to read text and write text ok(talking to os through fs)
// to saves a task in json file u first read the file and convert that text into data array format and store the task in array then convert the data again in tex and write back to fs which will tell os

command = process.argv[2]
argument = process.argv[3]
// id = process.argv[4]

// const arg = process.argv
// console.log("command: ",command) // add
// console.log("id: ",id) // 1
// console.log("arg: ",argument) // buy

const fs = require("fs");
// add feature
if(command == "add") {
   argument = process.argv[3]
    // 1. read file
    const fileData = fs.readFileSync("tasks.json", "utf-8");
    // 2. convert the text into js array
    const tasks = JSON.parse(fileData)

    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;

    const newTask = {
        id: lastId + 1,
        description: argument,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // 3. add new task
    tasks.push(newTask)
    // 4. convert js array into the text
    const updatedData = JSON.stringify(tasks, null, 2)
    // 5. write back to file
    fs.writeFileSync("tasks.json", updatedData)

    console.log(`Task added successfully (ID: ${newTask.id})`)
}

// update feature
if(command == "update") {
    id = process.argv[3]
    argument = process.argv[4]

    let taskId = id
    let arg = argument

    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    const updatedTasks = tasks.map(task => {
        if(taskId == task.id) {
            task.description = arg
            task.updatedAt = new Date()
            console.log(`Task updated successfully (ID: ${task.id})`)
        }
        return task
    })

    const updatedData = JSON.stringify(updatedTasks, null, 2)
    fs.writeFileSync("tasks.json", updatedData)
}

// delete feature
if(command == "delete") {
    id = process.argv[3]

    let taskId = id
    
    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    const updatedTasks = tasks.filter(task => taskId != task.id)
    const updatedData = JSON.stringify(updatedTasks, null, 2)
    fs.writeFileSync("tasks.json", updatedData)
    console.log(`Task deleted (ID: ${taskId})`)
}

// mark-in-progress
if(command == "mark-in-progress") {
    id = process.argv[3]

    let taskId = id

    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    const updatedTasks = tasks.map(task => {
        if(taskId == task.id) {
            task.status = "in-progress"
            task.updatedAt = new Date()
            console.log(`Task mark-in-progress successfully (ID: ${task.id})`)
        }
        return task
    })

    const updatedData = JSON.stringify(updatedTasks, null, 2)
    fs.writeFileSync("tasks.json", updatedData)
}

//mark-done
if(command == "mark-done") {
    id = process.argv[3]

    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    const updatedTasks = tasks.map(task => {
        if(id == task.id) {
            task.status = "done"
            task.updatedAt = new Date()
            console.log(`Task mark-done successfully (ID: ${task.id})`)
        }
        return task
    })

    const updatedData = JSON.stringify(updatedTasks, null, 2)
    fs.writeFileSync("tasks.json", updatedData)
}

// list done task, list in-progress, list all tasks
if(command === "list" && argument === "done") {

    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    tasks.forEach(task => {
        if(task.status === "done") {
            console.log(task)
        }
    })
    console.log("All done tasks listed successfully")

} else if(command === "list" && argument === "in-progress") {
    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    tasks.forEach(task => {
        if(task.status === "in-progress") {
            console.log(task)
        }
    })
    console.log("All progress tasks listed successfully")

} else if(command === "list" && argument === "todo") {
    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    tasks.forEach(task => {
        if(task.status === "todo") {
            console.log(task)
        }
    })
    console.log("All todo tasks listed successfully")
    
} else if(command === "list") {
    const fileData = fs.readFileSync("tasks.json", "utf-8")
    const tasks = JSON.parse(fileData)

    tasks.forEach(task => {
        console.log(task)
    })
    console.log(`All Tasks listed successfully.`)
}