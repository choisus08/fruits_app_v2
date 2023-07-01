const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();


/////////// sign-up routes //////////

// localhost:4004/user/signup (prefix of '/user' is applied)
router.get('/signup', (req, res) => {
    // this is temporary
    res.render('users/signup.ejs');
});

router.post('/signup', async (req, res) => {
    
    // at this point -> req.body = {username: 'susie', password: 'gordon'}

    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)); // generate 10 random characters & encrypt pw using that
        // now -> req.body = {username: 'susie', password: 'asdlkfjsaldfkji'}
        await User.create(req.body);
        res.redirect('/user/login');
    }catch {
        res.send('there was an error')
    }
});


/////// log-in routes ////////
router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

// case where the username entered doesn't exist in the db
if(!user) {
    res.send("user doesn't exist")
}else {
    // compare the password that was entered on the form (req.body.password)
    // to the password that is saved in the db
    const passMatches = bcrypt.compareSync(req.body.password, user.password);
        // if there is match, the result variable will be truthy
        if(passMatches) {
            req.session.username = req.body.username;
            req.session.loggedIn = true;
            res.redirect('/fruit')

        // if pw doesn't match     
        } else{
            res.send('wrong password')
        }
    }         

});

// destroy the session and have the user go back to the '/' route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    })
});

module.exports = router;