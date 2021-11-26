const router = require('express').Router();
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    let {firstName, lastName, email, password, repeatPassword } = req.body;
    try {
        if(password === repeatPassword) {
            await authService.register( firstName, lastName, email, password, repeatPassword )
            res.redirect('/');
        }
    } catch (error) {
        res.json(error);
    }
});

router.post('/login', async(req, res) => {
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
        res.redirect('/');
    } catch (error) {
        res.json(error);
        
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_COOKIE);
    res.redirect('/');
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