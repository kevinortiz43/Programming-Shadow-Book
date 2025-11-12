// https://youtu.be/DZBGEVgL2eE?si=eZdqgr_Sf_WHPioW
// THIS IS SEPARATE FROM randomIndGuy (from WebDevSimplified)
// https://youtu.be/DZBGEVgL2eE?si=NOroFKGeBRwy1R66&t=1255

import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./db.js";
import User from "./User.js";

dotenv.config(); // process.env
// const PORT = process.env.PORT || 5001;

// OPTION 1: save() user
// run: async () => {
//   const user = new User({ name: "Kyle", age: 26 });
//   await user.save();
//   console.log("User saved ", user);
// }

// OPTION 2: create() user
// run1: async () => {
//   const user1 = await User.create({name: "James", age: 30});
//   console.log("User create ", user1);
// }

// Update using save() user
// run2: async () => {
//   const user2 = await User.create({name: "Mary", age: 10});
//   user2.name = "Sally";
//   await user2.save();
//   console.log("User created then updated ", user2);
// }

// OPTION 2a: create() user
// run1: async () => {
//   try {
//   const user1 = await User.create({
//     name: "James", 
//     age: 30,
//     email: "TEST@test.com",
//     hobbies: ["Weight lifting", "bowling"],
//     address: {
//       street: "Main St",
//     },
//   });
//   console.log("User create ", user1);
// } catch (err) {
//   console.log(err.message);
// }
// }

// WebDevSimplified suggests NOT to use combined methods like findByIdAndUpdate or findOneAndUpdate or anything with And, updateOne, updateMany since skips validation steps
// instead of User.findByIdAndUpdate(), do this -> User.findById().save() to ensure validation steps are NOT skipped
// however, if DELETE, then okay to have some method with 'and', i.e. User.findByIdAndDelete()

//various methods by user id
// run3: async () => {
//   try{
//     const user3 = await User.findById("128505a2ds98fg"); // OPTION 1
//     const user3 = await User.find( {name: "Kyle"}); // OPTION 2 will find all entries with name Kyle
//     const user3 = await User.findOne( {name: "Kyle"}); // OPTION 3 will find 1st entry with name Kyle
//     const user3 = await User.exists( {name: "Kyle"}); // OPTION 4
//     const user3 = await User.deleteOne( {name: "Kyle"}); // OPTION 1: will delete 1st entry that matches, returns {deletedCount: 1} 
//     const user3 = await User.deleteMany( {name: "Kyle"}); // OPTION 2: delete many
//     console.log("User3 found ", user3);
//   } catch (err) {
//   console.log(err.message);
// }
// }

//various mongoDB operators
// run4: async () => {
//   try{
//     // const user4 = await User.where("name").equals("Kyle"); // find where name = "Kyle"
//     // const user4 = await User.where("age").gt(12); // find where age > 12
//     const user4 = await User.where("age")
//     .gt(12)
//     .lt(31)
//     .where("name")
//     .equals("Kyle")
//     .limit(2) 
//     .select("age")
//     user4[0].bestFriend = "3095812a2039bat";
//     await user4[0].save(); // will save bestFriend: new ObjectId(""3095812a2039bat")
//     // find where 31 > age > 12 AND where name = "Kyle", limit to 2 users, return ONLY "age" field
//     console.log("User4 found ", user4);
//   } catch (err) {
//   console.log(err.message);
// }
// }

//various mongoDB operators - populate
// run5: async () => {
//   try{
//     const user5 = await User.where("age")
//     .gt(12)
//     .where("name")
//     .equals("Kyle")
//     .populate("bestFriend") // will populate "bestFriend" field, like JOIN since instead of just being an id, will have all data on that bestFriend object 
//     .limit(1) 
//     console.log("User5 found ", user5);
//   } catch (err) {
//   console.log(err.message);
// }
// }

// using custom methods created on userSchema.statics and userSchama.query
// run6: async() => {
//   try {
//     // const user6 = await User.findByName("Kyle") // method with userSchema.statics can only be called on User, NOT on queries, so User.find().findByName() would NOT work 
//     const user6 = await User.find().byName("Kyle") // with userScheme.query the method can ONLY be called on the query, so chain to .find(), .where(), etc. You canNOT call byName() directly on User
//     console.log(user6);
//     user6.sayHi()
//   } catch (err) {
//     console.log(err.message)
//   }
// }

// using custom method on userSchema.virtual
run7: async() => {
  try {
    const user7 = await User.findOne( { name: "Kyle",  email: "test@test.com"} ) 
    console.log(user7);
    console.log(user7.namedEmail)
  } catch (err) {
    console.log(err.message)
  }
}


connectDb().then(() => {
  // better to put connectDb() here since no point in starting App if can’t connect to Db
  const PORT = process.env.PORT || 5001;
  console.log("PORT 1: ", PORT);

  app.listen(PORT, () => {
    console.log("server started on PORT: ", PORT);
  });
});
