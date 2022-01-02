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


router.get('/:userId', async (req, res) => {
    try{
        const user = await authService.getUser(req.params.userId);
        res.json(user);
    } catch(error) {
        res.json({message: error.message});
    }
});

router.delete('/:userId/delete', async(req, res) => {
    try{
        await authService.deleteUser(req.params.userId);
        res.json({ok: true});

    }catch(error) {
        res.json({message: error.message});
    }
});

router.get('/', async(req, res) => {
    try {
        let allUsers = await authService.getAllUsers();
        res.json(allUsers);

    } catch(error) {
        res.json({message: error.message});
    }
});

router.get('/sort', async(req, res) => {
    try {
        let sortedUsers = await authService.sortUsers(specialty);
        // .populate({ path: 'theoneyouwanttosort', options: { sort: { createdAt: -1 } } }) 
        res.json(sortedUsers);

    } catch(error) {
        res.json({message: error.message});
    }
});


module.exports = router;