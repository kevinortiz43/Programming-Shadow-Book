
import mongoose from "mongoose";

// can also have a whole new schema and reference the properties that are nested in userSchema obj
const addressSchema = new mongoose.Schema( {
    street: String,
    city: String,
    // automatically creates primary key (ObjectId)
})


// can have nested properties
// The props object is a Mongoose Validation Properties Object that Mongoose automatically passes to your validator function.
/*
Properties available in props:
props.value - The value that failed validation (in your case, the age value)
props.path - The schema path that failed validation ("age")
props.reason - The error object that was thrown (if any)
props.kind - The validation type that failed ("user defined")
*/

const userSchema = new mongoose.Schema( {
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: val => val % 2 ===0,
            message: props => `${props.value} is not an even number`
        }
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
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema, // automatically creates foreign key (ObjectId) = addressSchema's primary key
})


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


export const userModel = mongoose.model("User", userSchema)