import mongoose from "mongoose";

// can also have a whole new schema and reference the properties that are nested in userSchema obj
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  // automatically creates primary key (ObjectId)
});

// can have nested properties
// The props object is a Mongoose Validation Properties Object that Mongoose automatically passes to your validator function.
/*
Properties available in props:
props.value - The value that failed validation (in your case, the age value)
props.path - The schema path that failed validation ("age")
props.reason - The error object that was thrown (if any)
props.kind - The validation type that failed ("user defined")
*/

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (val) => val % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    minLength: 1,
    required: true,
    lowercase: true, // will automatically make lowercase regardless of input
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User", // which model does this ObjectId reference
  },
  hobbies: [String],
  address: addressSchema, // automatically creates foreign key (ObjectId) = addressSchema's primary key
});

// can have nested properties
// const userSchema = new mongoose.Schema( {
//     name: String,
//     age: Number,
//     email: String,
//     createdAt: Date,
//     updatedAt: Date,
//     bestFriend: mongoose.SchemaTypes.ObjectId,
//     hobbies: [String],
//     address: {
//         street: String,
//         city: String
//     }
// })


userSchema.methods.sayHi = function() { // canNOT use arrow syntax since use 'this'
    console.log(`Hi, my name is ${this.name}`)
}

// using statics - where just returns what's found
userSchema.statics.findByName = function(name) {
    return this.find( {name: new RegExp(name, 'i')}) // i case insensitive
}

// using query - where() for query-related stuff
userSchema.query.byName = function (name) {
return this.where( {name: new RegExp(name, 'i')}) // i case insensitive
}

// using virtual - creating property that doesn't exist in schema 
// for properties you do NOT want to save in DB but might use all across your app
userSchema.virtual('namedEmail').get(function() {
    return `${this.name} <${this.email}>}`
})

// can create middleware - use either pre or post
// if want to use middleware BEFORE your model then pre
// the below could be 'validate', 'remove', depending on whether your middleware runs BEFORE validating, removing , saving, etc.
// before saving, the time is updated
userSchema.pre('save', function(next) {
    this.updateAt = Date.now();
    // can use throw new Error('') and the catch in the run() function from script.js will catch / pass in that error
    next();
}) 

// after saving, will run sayHi, then move onto next middleware
userSchema.post('save', function(doc, next) {
    doc.sayHi();
    next();
}) 


export const userModel = mongoose.model("User", userSchema);
