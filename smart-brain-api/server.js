const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Saly',
            email: 'saly@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users)
})

app.post('/signin', (req, res)=> {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json("signin");
    } else{
        res.status(400).json("Mot de passe ou email erroné");
    }
})

app.post('/register', (req, res)=> {
    const {name, email, password} = req.body;
    database.users.push({
        id:125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
   res.json(database.users[database.users.lenght-1])
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})