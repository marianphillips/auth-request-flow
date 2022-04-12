const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    if(req.body.username && req.body.password && req.body.username === mockUser.username && req.body.password === mockUser.password) {
        res.json(jwt.sign({username: mockUser.username}, "secret"))
       }
    else {
        res.status(400).json({error: "invalid username or password"}) 
    }

    
});

router.get('/profile', (req, res) => {

    const token = req.headers.authorization

    try {
        jwt.verify(token.slice(7), "secret")
        return res.json({profile: mockUser.profile})
      } catch(err) {
        if(err) {
            return (
                res.status(401).json("Error")
            )
        } 
      }


});

module.exports = router;
