const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');


router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try{
        await user.save();

        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
    
    // ***Without async/await***
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
})

router.post('/users/login', async (req,res) => {
    try {
        // findByCredentials(email, password) will be defined by ourselves(not a predefined function)
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();
    
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

// to get your profile if authenticated
router.get('/users/me', auth, async (req,res) => {

    // we have set user data already in req.user in auth middleware
    res.send(req.user);

    // try{
    //     const users = await User.find({});
    //     res.send(users);
    // } catch(e){
    //     res.status(500).send();
    // }

    // ***Without async/await***
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
})

// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user)
//             return res.status(404).send();
//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }

//     // ***Without using async/await***
//     // User.findById(_id).then((user) => {
//     //     if(!user){
//     //         return res.status(404).send();
//     //     }
//     //     res.send(user)
//     // }).catch((error) => {
//     //     res.status(500).send();
//     // })
    
//     // console.log(req.params);
// })

router.patch('/users/me', auth, async (req,res) => {
    // const _id = req.params.id;
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation)
        return res.status(400).send({'error' : 'Invalid updates'});

    try {
        // const user = await User.findById(req.user._id);

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
    
        await req.user.save();
        
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});

        // if(!user)
        //     return res.status(404).send();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        // const deletedUser = await User.findByIdAndDelete(req.params.id);
        // const deletedUser = await User.findByIdAndDelete(req.user._id);

        // if(!deletedUser)
        //     return res.status(404).send();

        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
})

const uploads = multer({
    // dest: avatar,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            return cb(new Error('Please upload an image file only!'))
        }

        cb(undefined, true);
    }
});
router.post('/users/me/avatar', auth, uploads.single('avatar'), async (req,res) => {
    //to use req.file.buffer we need to remove 'dest' property
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()

    req.user.avatar = buffer;
    await req.user.save();
    res.send();

}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => 
{
    if(!req.user.avatar){
        return res.send({msg: 'No avatar to delete'});
    }
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        //by default
        // res.set('Content-Type', 'application/json')
        res.set('COntent-Type', 'image/png');
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send();
    }
})

module.exports = router;