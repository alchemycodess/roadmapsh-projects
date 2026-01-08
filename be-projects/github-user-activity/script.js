/*
#github user activity
- why should i even build this project?
to getout of ui and only think about logic and think like backend dev
- in this project we need to give input(usernmae) run the logic(fetch with api and handle it gracefully) and get output(activity of user)

what i have to do for this project
1. create cl and capture the cl
2. with checking the cmnds fetch and do error handling 
3. check if the command is github-activity if not send error
4. check if the argument is their or not
5. check if username exists or not if not handle error

#why using fetch?
-to get the data from wnywhere in the world, if want the data from anywhere we need, it will bring the data using fetch
#why fetch returns promise
-whenever we run the fetch it doesnt get the data immediately, it takes time coz it getting it from somewhere so obv it takes time, so fetch is saying i dont have data, but i promise will return u later, so thats why it returns promise
#here is the syntax for fetch
-fetch(someurl) => means, it is sending req to url to get data and it will return promise
fetch(https://example.com/joke)
 .then(response => response.json())
 .then(data => {
    console.log(data.joke)  
  })
1. fetch(...) => sends req returns promise
2. .then(response => ...) when the res arrives do this
3. response.json() => converts raw res to usable data
4. .then(data => ...) => when data is ready use it
  

# same logic with async/await (cleaner thinking)
const response = await fetch(https://example.com/joke) => wait for fetch
const data = await response.json() => wait for json
console.log(data.joke) => use the data

// any time when data comes from outside it will be asynchronous
1. fetch is a function, it returns promise and promise is an object that contains the data which will comes later 
=> fetch() -> promise(the reponse will come later)
fetch - functon
fetch() - returns promise
2. response.json is also a function, it also returns promise 
=> response.json() -> promise(the data will come later)
response.json - function
response.json() - returns promise
*/

command = process.argv[2]
argument = process.argv[3]

if(!argument) {
    console.log("Usage: github-activity <username>")
    return
} 

if(command == "github-activity") {
    fetch(`https://api.github.com/users/${argument}/events`)
        .then(response => {
            if(!response.ok) {
                throw new Error("User not found")
            }
            return response.json()
        })
        .then(data => {
            const result = data

            console.log("Output-")
                result.forEach(res => {
                    if(res.type === "WatchEvent") {
                        console.log(`Starred ${res.repo.name}`)
                    }

                    if(res.type === "IssuesEvent" && res.payload.action === "opened") {
                        console.log(`Opened an issue in ${res.repo.name}`)
                    }

                    if(res.type === "IssuesEvent" && res.payload.action === "closed") {
                        console.log(`Closed an issue in ${res.repo.name}`)
                    }
                });
            
        })
        .catch(err => {
            console.log(err.message)
        })
}