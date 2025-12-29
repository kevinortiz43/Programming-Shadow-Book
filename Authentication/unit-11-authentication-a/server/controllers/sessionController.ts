import Session from "../models/sessionModel.ts";
import type { RequestHandler } from "express";

interface SessionController {
  isLoggedIn: RequestHandler;
  startSession: RequestHandler;
}

const sessionController: SessionController = {
  /**
   * isLoggedIn - find the appropriate session for this request in the database, then verify whether or not the session is still valid.
   */
  // isLoggedIn: (req, res, next) => {
  //   console.log('isLoggedIn starting');
  //   console.log('req.cookies ', req.cookies )
  //   const sessionId = req.cookies.ssid; // just use req.cookies to see if cookies exist rather than req.cookies.sessionId
  //   let isLoggedIn;

  //   try {
  //     isLoggedIn = sessionId ? true : false;
  //     console.log('isLoggedIn ', isLoggedIn)
  //     return next();
  //     }
  //   catch (err) {
  //     return next(err);
  //   }
  // },


isLoggedIn: async (req, res, next) => { // Make it async
  console.log('isLoggedIn starting');
  console.log('req.cookies ', req.cookies);
  
  const sessionId = req.cookies.ssid;
  
  if (!sessionId) {
    console.log('No session cookie found');
    return res.redirect('/'); // or to login page
  }

  try {
    // Verify the session exists in database
    const session = await Session.findOne({ cookieId: sessionId });
    if (!session) {
      console.log('Session not found in database');
      res.clearCookie('ssid'); // Clear invalid cookie
      return res.redirect('/');
    }
    
    console.log('User is logged in');
    res.locals.userId = sessionId;
    return next();
  } catch (err) {
    console.error('Error checking session:', err);
    return next(err);
  }
},


  /**
   * startSession - create and save a new Session into the database.
   */
  startSession: async (req, res, next) => {
    console.log('sessionController is running')
    try {
    const { userId } = res.locals;
      if (!userId) {
        return next(new Error ('no userId for res.locals cookie'))
      }
      console.log('res.locals userId ', userId)

    const newSession = await Session.create( {
      cookieId: userId
     })
    console.log('Session created for user:', userId);
      return next();
    } catch (err) {
      return next(err);
    }

  },
};

export default sessionController;
