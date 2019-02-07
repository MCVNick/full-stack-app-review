const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        // console.log('register endpoint hit')
        const { username, password } = req.body;
        const db = req.app.get('db')
        const { session } = req

        let user = await db.user.check_user({username: username})
        user = user[0]
        // console.log(user)
        if(user) {
            return res.status(400).send('User already created')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        // console.log({hash})

        let newUser = await db.user.register({ username: username, password: hash })
        newUser = newUser[0]
        // console.log({newUser})
        // console.log({session})

        session.user = {...newUser}
        // console.log({session})

        res.status(201).send(session.user)
    },
    login: async (req, res) => {
        // console.log('login endpoint hit')
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')
        let user = await db.user.login({username: username})
        user = user[0]
        // console.log(user)
        if(!user) {
            return res.status(400).send('User not found')
        }

        const foundUser = bcrypt.compareSync(password, user.password)
        if(foundUser) {
            delete user.password
            session.user = user
            res.send(session.user)
        }
        else {
            res.status(401).send('Incorrect password')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        const {user} = req.session
        // console.log(req.session)

        if (user) {
            res.send(user)
        } else {
            res.status(401).send('Forbidden')
        }
    }
}