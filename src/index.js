import express from 'express'

const app = express()
app.use(express.json())

//Testdaten generiert mit ChatGPT
let tasks = [
    {"id":"1","title":"Go for a jog","created_on":"2023-05-05","fulfilled_on":null},
    {"id":"2","title":"Clean the kitchen","created_on":"2023-05-05","fulfilled_on":"2023-05-05"},
    {"id":"3","title":"Buy groceries","created_on":"2023-05-04","fulfilled_on":"2023-05-05"},
    {"id":"4","title":"Study for exam","created_on":"2023-05-04","fulfilled_on":null},
    {"id":"5","title":"Call mom","created_on":"2023-05-03","fulfilled_on":"2023-05-03"},
    {"id":"6","title":"Do laundry","created_on":"2023-05-03","fulfilled_on":null},
    {"id":"7","title":"Take the dog to the park","created_on":"2023-05-02","fulfilled_on":"2023-05-03"},
    {"id":"8","title":"Attend meeting","created_on":"2023-05-02","fulfilled_on":"2023-05-02"},
    {"id":"9","title":"Organize closet","created_on":"2023-05-01","fulfilled_on":"2023-05-01"},
    {"id":"10","title":"Read book","created_on":"2023-05-01","fulfilled_on":"2023-05-02"}
]


app.get('/tasks', (request, response) => {
    response.status(200).json(tasks)
})

//Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.get('/tasks/:id', (request, response) => {
    const id = request.params.id
    let task = tasks.find(task => task.id === id)
    if (task) {
        response.status(200).json(task)
    }
    else {
        response.status(404).send('task has not been found')
    }
})

//Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.post('/tasks', (request, response) => {
    const task = request.body
    tasks = [...tasks, task]
    response.sendStatus(201)
})

//Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.put('/tasks/:id', (request, response) => {
    const id = request.params.id
    const task = tasks.find(task => task.id === id)
    if (task) {
        const index = tasks.findIndex((t) => t.id === task.id)
        const newTask = request.body
            tasks[index] = newTask
            response.status(202).json(task)
        
    } else {
        response.sendStatus(404)
    }
})

//Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.delete('/tasks/:id', (request, response) => {
    const id = request.params.id
    let task = tasks.find(task => task.id === id)
    if (task) {
    const deletedTask = tasks.find(task => task.id === id)
    tasks = tasks.filter((t) => t.id !== id);
    response.status(202).json(deletedTask)
    } else {
        response.sendStatus(404)
    }
    
})



app.listen(3010, () => {
    console.log(`Example app listening on port 3010`)
})