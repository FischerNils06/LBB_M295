import express from 'express'
import session from 'express-session'

const app = express()
app.use(express.json())
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {}

}))

let checklogin = false
const correctPassword = 'm295'
function checkmail (email) {
  const emailLetters = email.split('')

  if (!emailLetters.includes('@')) {
    return false
  } else {
    return true
  }
}

function generateId () {
  let id = 0

  for (let i = 0; i <= tasks.length; i++) {
    id += 1
  }
  const newId = id + 1
  return newId.toString()
}

// Testdaten generiert mit ChatGPT ausser author
let tasks = [
  { id: '1', title: 'jogging', created_on: '2023-05-01', fullfilled_on: '2023-05-02T09:15:32.123Z', author: 'nils@f.com' },
  { id: '2', title: 'reading', created_on: '2023-05-02', fullfilled_on: '2023-05-02T17:45:12.482Z', author: 'nils@f.com' },
  { id: '3', title: 'meditation', created_on: '2023-05-03', fullfilled_on: '2023-05-03T08:30:00.000Z', author: 'nils@f.com' },
  { id: '4', title: 'cooking', created_on: '2023-05-03', fullfilled_on: '2023-05-03T19:55:03.876Z', author: 'nils@f.com' },
  { id: '5', title: 'gardening', created_on: '2023-05-04', fullfilled_on: '2023-05-04T13:12:47.921Z', author: 'nils@f.com' },
  { id: '6', title: 'painting', created_on: '2023-05-04', fullfilled_on: '2023-05-04T20:05:08.753Z', author: 'nils@f.com' },
  { id: '7', title: 'yoga', created_on: '2023-05-05', fullfilled_on: '2023-05-05T09:40:16.337Z', author: 'nils@f.com' },
  { id: '8', title: 'swimming', created_on: '2023-05-05', fullfilled_on: '2023-05-05T11:55:43.214Z', author: 'nils@f.com' },
  { id: '9', title: 'writing', created_on: '2023-05-05', fullfilled_on: '2023-05-05T14:20:00.000Z', author: 'nils@f.com' },
  { id: '10', title: 'hiking', created_on: '2023-05-05', fullfilled_on: '2023-05-05T16:45:09.819Z', author: 'nils@f.com' }
]

app.get('/tasks', (request, response) => {
  if (checklogin) {
    response.status(200).json(tasks)
  } else {
    response.status(403).json({ error: 'Not Logged In' })
  }
})

// Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.get('/tasks/:id', (request, response) => {
  if (checklogin) {
    const id = request.params.id
    const task = tasks.find(task => task.id === id)
    if (task) {
      response.status(200).json(task)
    } else {
      response.status(404).send('task has not been found')
    }
  } else {
    response.status(403).json({ error: 'Not Logged In' })
  }
})

// Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.post('/tasks', (request, response) => {
  if (checklogin) {
    const today = new Date()

    const task = { id: generateId(), title: request.body.title, created_on: today, fulfilled_on: null, author: request.session.email }
    if (task.title === '' || task.title == null) {
      response.send(406).json({ error: 'Not Acceptable' })
    } else {
      tasks = [...tasks, task]
      response.sendStatus(201)
    }
  } else {
    response.status(403).json({ error: 'Not Logged In' })
  }
})

// Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.put('/tasks/:id', (request, response) => {
  if (checklogin) {
    const id = request.params.id
    const task = tasks.find(task => task.id === id)
    const { finished } = request.body

    if (finished) {
      task.fullfilled_on = new Date()
    }

    if (task) {
      const authors = task.author + ' , ' + request.session.email
      const index = tasks.findIndex((t) => t.id === task.id)
      const newTask = { id: task.id, title: request.body.title, created_on: task.created_on, fullfilled_on: task.fulfilled_on, author: authors }

      tasks[index] = newTask
      response.status(202).json(newTask)
    } else {
      response.sendStatus(404)
    }
  } else {
    response.status(403).json({ error: 'Not Logged In' })
  }
})

// Inspiriert von der Bibliothekaufgabe --> Rep_M295/aufgaben_express/bibliothek/index.js
app.delete('/tasks/:id', (request, response) => {
  if (checklogin) {
    const id = request.params.id
    const task = tasks.find(task => task.id === id)
    if (task) {
      const deletedTask = tasks.find(task => task.id === id)
      tasks = tasks.filter((t) => t.id !== id)
      response.status(202).json(deletedTask)
    } else {
      response.sendStatus(404)
    }
  } else {
    response.status(403).json({ error: 'Not Logged In' })
  }
})

// Inspiriert von https://openscript.github.io/course-zli-m295/#/83?clicks=10 Seite 83
app.post('/login', (request, response) => {
  const email = request.body.email
  const password = request.body.password

  if (password === correctPassword && checkmail(email) === true) {
    request.session.email = email
    checklogin = true
    response.status(200).json({ email: request.session.email })
  } else {
    response.status(401).json({ error: 'Invalid email or wrong password' })
  }
})

// Inspiriert von https://openscript.github.io/course-zli-m295/#/83?clicks=10 Seite 83
app.get('/verify', (request, response) => {
  if (request.session.email) {
    response.status(200).json({ email: request.session.email })
  } else {
    response.status(401).json({ error: 'Unauthorized' })
  }
})

// Inspiriert von https://openscript.github.io/course-zli-m295/#/83?clicks=10 Seite 83
app.delete('/logout', (request, response) => {
  if (request.session.email) {
    request.session.email = null
    checklogin = false
    response.sendStatus(204)
  } else {
    response.status(401).json({ error: 'Unauthorized' })
  }
})

app.listen(3010, () => {
  console.log('Example app listening on port 3010')
})
