const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        // Get the array of user data from the request body
        const users = req.body;

        // Hash the passwords for all users in the array
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return {
                username: user.username,
                password: hashedPassword,
            };
        }));

        // Create multiple user records with hashed passwords
        const createdUsers = await User.bulkCreate(hashedUsers);

        res.status(200).json(createdUsers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const userData = await User.findOne({
            where: { username },
        });

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        }

        // If the password matches, set the session to indicate the user is logged in
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'Login was successful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;