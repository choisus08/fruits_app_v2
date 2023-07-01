const express = require('express');
const Fruit = require('../models/fruit');

// routing middleware that allows the routes defined on this file to be used on our server.js file
// as app.use('fruits', FruitsRouter)
const router = express.Router();

router.use((req, res, next) => {
    // req.session is already accessed
    // check to see if the user is logged in via the req.session.loggedIn property. This was defined in the controller.user.js file
    // if the user is loggedIn we're going to use the next() which means allow the user to access the routes defined below 
    if(req.session.loggedIn) {
        next();
    }else {
        // else the use is NOT loggedIn, therefore have the user redirected to the login page
        res.redirect('/user/login')
    }
});


// controllers
router.get('/', async (req, res) => {
    // const allFruits = [{ name: 'banana'}, { name: 'apple'}]
    const allFruits = await Fruit.find({username: req.session.username});
    res.render('fruits/index.ejs', { fruits: allFruits, user: req.session.username });
});

/* the above is the same thing as:
{
    fruits: [{ name: 'banana}, { name: 'apple}]
}
OR
{
    fruits: fruits
}
*/

router.get('/new', (req, res) => {
    res.render('fruits/new.ejs')
});

router.post('/', async (req, res) => {
    // what the object looks like BEFORE conditional
    // {
    //     name: 'mango',
    //     color: 'green',
    //     readyToEat: 'on'
    // }

    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true
    }else {
        req.body.readyToEat = false
    }

    // more concise way is a TERNARY: 
    // ready.body.readyToEat = ready.body.readyToEat === 'on' ? true : false

    // after conditional, the object will look like this:
    // {
    //     name: 'mango',
    //     color: 'green',
    //     readyToEat: 'true',
    // }

    req.body.username = req.session.username
    // {
    //     name: 'mango',
    //     color: 'green',
    //     readyToEat: 'true',
    //     username: req.session.username
    // }

    await Fruit.create(req.body);
    res.redirect('/fruit')
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findById(id);
    res.render('fruits/show.ejs', {fruit})
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Fruit.findByIdAndDelete(id);
    res.redirect('/fruit')
});

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findById(id);
    res.render('fruits/edit.ejs', {fruit})
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruit.findByIdAndUpdate(id, req.body);
    res.redirect('/fruit')
});


module.exports = router;