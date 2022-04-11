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
        res.json({error: "invalid username or password"}) 
    }

    
});

router.get('/profile', (req, res) => {

    try {
        jwt.verify(req.rawHeaders[5].slice(8, req.rawHeaders[5].length - 1), "secret")
        return res.json(mockUser)
      } catch(err) {
        if(err) return res.json("Error")
      }


});

module.exports = router;
