const router = require('express').Router();
const { TOKEN_COOKIE } = require('../constants');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let {firstName, lastName, email, password, repeatPassword } = req.body;
    try {
        if(password === repeatPassword) {
            await authService.register( firstName, lastName, email, password, repeatPassword )
            res.redirect('/');
        }
    } catch (error) {
        res.render('auth/register', {error: error.message});
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
}); 

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try{ 
        let user = await authService.login(email, password);
        if(!user) {
            return res.render('auth/register',{error:`There is no such user or password.${error.message}`});
        }

        let token = await authService.createToken(user);
        
        res.cookie(TOKEN_COOKIE, token, {
            httpOnly: true
        });
        res.redirect('/');
    } catch (error) {
        res.render('auth/register', {error: error.message});
        
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
        res.render('my-projects', {email, projects});
    } catch(error) {
        res.render('home', {error: error.message})
    }
});

module.exports = router;