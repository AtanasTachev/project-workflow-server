const router = require('express').Router();
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    let {specialty,
        title,
        firstName,
        lastName,
        email,
        password,
        repeatPassword } = req.body;
        // console.log(req.body)
    try {
        if(password === repeatPassword) {
            let user = await authService.register({            
                specialty,
                title,
                firstName,
                lastName,
                email,
                password });
                console.log(user);
            let accessToken = await authService.login(email, password)
            res.json({
                _id: user._id,
                email: user.email,
                accessToken
            });
        }
    } catch (error) {
        console.log({message: error.message});
    }
});

router.post('/login', async(req, res) => {

    try{ 
        // console.log(req.body);
        const { email, password } = req.body;
        // console.log([email, password]);

        const { user, accessToken } = await authService.login(email, password)

        res.json({
            _id: user._id,
            email: user.email,
            accessToken
        });
    } catch (error) {
        console.log({message: error.message});
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.json({ok: true});
});


router.get('/:userId/my-projects', isAuth, async (req, res) => {
    try{
        let user = await authService.getUser(req.user._id);
        let email = req.user.email;
        let projects = user.getProjects();
        res.json({email, projects});
    } catch(error) {
        res.json({message: error.message});
    }
});

module.exports = router;