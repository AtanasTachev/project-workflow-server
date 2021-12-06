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
    try {
        if(password === repeatPassword) {
            let user = await authService.register({            
                specialty,
                title,
                firstName,
                lastName,
                email,
                password });
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
        const { email, password } = req.body;

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

router.post('/logout', isAuth, async(req, res) => {
    res.json({_id: '',
              email: '',
              accessToken: ''
            });
});


router.get('/:userId/myProjects', async (req, res) => {
    try{
        let user = await authService.getUser(req.user._id);
        let userInfo = req.user;
        let projects = user.getProjects();
        res.json({userInfo, projects});
    } catch(error) {
        res.json({message: error.message});
    }
});

router.get('/getAll', async(req, res) => {
    try {
        let allUsers = await authService.getAllUsers();
        res.json(allUsers);

    } catch(error) {
        res.json({message: error.message});
    }
});


module.exports = router;