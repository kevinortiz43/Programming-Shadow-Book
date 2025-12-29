import User from "../models/userModel.ts";
import type { RequestHandler } from "express";
import bcrypt from "bcryptjs"; // ES6 module import statement used in JavaScript to bring the bcryptjs library (bcryptjs is slower but works  with js)
// import bcrypt from "bcrypt"; // bcrypt faster with C++ 

interface UserController {
  getAllUsers: RequestHandler;
  createUser: RequestHandler;
  verifyUser: RequestHandler;
}

const userController: UserController = {
  /**
   * getAllUsers - retrieve all users from the database and stores it into res.locals
   * before moving on to next middleware.
   */
  getAllUsers: (req, res, next) => {
    User.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err)
        return next(
          "Error in userController.getAllUsers: " + JSON.stringify(err),
        );

      // store retrieved users into res.locals and move on to next middleware
      res.locals.users = users;
      return next();
    });
  },

  /**
   * createUser - create and save a new User into the database.
   */
  createUser: async (req, res, next) => {
    const { username, password } = req.body;

    try {
      // hash the pw
      const hashPwd = await bcrypt.hash(password, 10);

      // create new user
      const newUser = new User( {
        username: username,
      password: hashPwd
      });

      await newUser.save();

   // store user ID for setSSIDCookie to use
    res.locals.userId = newUser._id;
    res.locals.username = newUser.username;

      // res.redirect('/secret');

      console.log('new user created: ', newUser.username)

      return next();
    } catch (err) {
      return next(err);
    }
    
  },

  /**
   * verifyUser - Obtain username and password from the request body, locate
   * the appropriate user in the database, and then authenticate the submitted password
   * against the password stored in the database.
   */
  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      // check if already existing user, IF the userSchema didn't already require unique
      const userExist = await User.findOne({username});

      if (!userExist) {
        return res.redirect('/signup');
      }

        console.log('user exists');

    // Compare passwords properly
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.redirect('/signup');
    }

    // Only set these if authentication succeeds
    res.locals.userId = userExist._id;
    res.locals.username = userExist.username;
    console.log('verifyUser userId ', userExist._id);
    
    return next();


    //     // const hashPwd = await bcrypt.hash(password, 10);
    //     // const passwordsMatch = await bcrypt.compare(hashPwd, userExist.password); 

    //     // const passwordsMatch = await bcrypt.compare(password, userExist.password) 
    //     // passwordsMatch ? console.log('pwd matches!') : console.log('no match'); 
    
    //     if (password === userExist.password) {
    //     // res.locals.verifyUser = userExist
    //     res.locals.userId = userExist._id; // store _id from DB for setSSIDCookie
    //     res.locals.username = userExist.username; // store username from DB
    //     console.log('verifyUser userId ', userExist._id);
    //     console.log('verifyUser username ', userExist.username);
    //     } 
    //  return next();
    } catch (err) {
      return next(err)
    }
  },
};

export default userController;



