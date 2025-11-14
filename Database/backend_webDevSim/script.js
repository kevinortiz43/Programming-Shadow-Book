// https://youtu.be/DZBGEVgL2eE?si=eZdqgr_Sf_WHPioW
// THIS IS SEPARATE FROM randomIndGuy (from WebDevSimplified)
// https://youtu.be/DZBGEVgL2eE?si=NOroFKGeBRwy1R66&t=1255

import dotenv from "dotenv";

import { connectDb } from "./db.js";
import User from "./User.js"


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

//various methods by user id
run3: async () => {
  try{
    const user3 = await User.findById("....."); // OPTION 1
    // const user3 = await User.find( {name: "Kyle"}); // OPTION 2
    // const user3 = await User.findOne( {name: "Kyle"}); // OPTION 3
    // const user3 = await User.exists( {name: "Kyle"}); // OPTION 4
    // const user3 = await User.deleteOne( {name: "Kyle"}); // OPTION 1: will return {deletedCount: 1}
    // const user3 = await User.deleteMany( {name: "Kyle"}); // OPTION 2: delete many
    console.log("User3 create ", user3);
  } catch (err) {
  console.log(err.message);
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
