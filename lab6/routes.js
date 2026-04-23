const epxress = require("express");
const router = express.Rotuer();

route.get('/api/users', (req, res) => {
    res.json({...users, url: res.locals.url})
});

route.get('/api/users/:id', (req, res) => {
    const found = users.find(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(found)
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
    }
});

route.post('/api/users', (req, res) => {
    const newUser = {
        id: Math.max(...(users.map(user => user.id))) + 1,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny"
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Wprowadź poprawne imię i nazwisko oraz email!', url: res.locals.url })
    }
    users.push(newUser)
    res.json({...users, url: res.locals.url})
});

route.patch('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user !== -1) {
        const updUser = req.body
        user.name = updUser.name ? updUser.name : user.name;
        user.email = updUser.email ? updUser.email : user.email;
        res.json({ msg: 'Dane użytkownika zaktualizowane', user })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!`, url: res.locals.url })
    }
})

route.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    userId = users.findIndex(user => user.id === id);
    if (userId === -1) {
        return res.status(400).send({ msg: `Użytkownik o id ${id} nie istnieje`, url: res.locals.url })
    }
    const user = users[userId];
    users.splice(userId, 1);
    res.status(200).json({ userDeleted: user, res: res.locals.url })
});