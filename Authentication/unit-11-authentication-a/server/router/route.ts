import express from "express"
import userController from '../controllers/userController.ts';
import cookieController from '../controllers/cookieController.ts';

import sessionController from '../controllers/sessionController.ts';
const router = express.Router();

/**
* signup
*/
router.post('/signup', userController.createUser , cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful sign up?
  console.log(req.cookies);  
  // return res.status(200).json(res.locals.createUser)
  res.redirect('/secret');
});


/**
* login
*/
router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful log in?
  console.log('POST login req.cookies ', req.cookies);
 // return res.status(200).json(res.locals.verifyUser)  
  res.redirect('/secret');
});


/**
* Authorized routes
*/
router.get('/check-cookies', (req, res) => {
  console.log('Cookies received:', req.cookies);
  res.json({ 
    cookies: req.cookies,
    headers: req.headers.cookie
  });
});

// router.get('/secret', sessionController.isLoggedIn, (req, res) => {
//   res.sendFile(path.resolve(import.meta.dirname, '../client/secret.html'));
// });

router.get('/secret/users', sessionController.isLoggedIn, userController.getAllUsers, (req, res) => {
  res.send( { users: res.locals.users });
})



// cookie for all requests here?
// router.use('/', cookieController.setCookie, (req, res) => {
//   console.log(req.cookies);  // should show cookie headers
//   res.send('set a new cookie!');
// })


export default router;