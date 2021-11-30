const router = require('express').Router();
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res, next) => {
    let {specialty,
        title,
        firstName,
        lastName,
        email,
        password } = req.body;
    try {
        if(password === repeatPassword) {
            let user = await authService.register({             
                specialty,
                title,
                firstName,
                lastName,
                email,
                password })
            let accessToken = await authService.login({email, password})
            res.json({
                _id: user._id,
                email: user.email,
                accessToken
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    try{ 
        let user = await authService.login(email, password);
        if(!user) {
            return res.json(error);
        }

        let token = await authService.createToken(user);
        
        res.cookie(TOKEN_COOKIE, token, {
            httpOnly: true
        });
        res.json({
            _id: user._id,
            email: user.email,
            accessToken
        });
    } catch (error) {
        next(error);
        
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_COOKIE);
    res.json({ok: true});
});


router.get('/:userId/my-projects', isAuth, async (req, res) => {
    try{
        let user = await authService.getUser(req.user._id);
        let email = req.user.email;
        let projects = user.getProjects();
        res.json({email, projects});
    } catch(error) {
        res.json(error);
    }
});

module.exports = router;