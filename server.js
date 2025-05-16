const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];
let idCounter = 1;

// CREATE user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const newUser = { id: idCounter++, name, email, age };
    users.push(newUser);
    res.status(201).json(newUser);
});

// READ all users
app.get('/users', (req, res) => {
    res.json(users);
});

// READ single user
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
});

// UPDATE user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        const { name, email, age } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.age = age || user.age;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
