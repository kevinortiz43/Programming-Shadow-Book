import type { RequestHandler } from "express";
import User from "../models/userModel.ts";

interface CookieController {
  setCookie: RequestHandler;
  setSSIDCookie: RequestHandler;
}

const cookieController: CookieController = {
  /**
   * setCookie - set a cookie with a random number
   */
  setCookie: (req, res, next) => {
    const randomNum = Math.floor(Math.random()*100)
    try {
      // res.cookie('codesmith', 'hi')
      res.cookie("secret", randomNum, {
        httpOnly: true,
        // secure: true,
        maxAge: 1000 * 60,
      })
      return next();
    } catch (err) {
      return next(err);
    }
  },

  /**
   * setSSIDCookie - store the user id in a cookie
   */
  setSSIDCookie: (req, res, next) => {
    console.log('setSSIDCookie is running')
    try {
    const { userId } = res.locals;
      if (!userId) {
        return next(new Error ('no userId for SSID cookie'))
      }
      console.log('cookieSSID userId ', userId)
      res.cookie("ssid", userId, {
        httpOnly: true,
        // secure: true, // ONLY work with HTTPS, NOT localhost
        maxAge: 1000 * 30,
      })
      // console.log('req.cookies ', req.cookies) // req.cookies NOT yet available since cookies are set in response headers
      return next();
    } catch (err) {
      return next(err);
    }
  },

};



export default cookieController;
