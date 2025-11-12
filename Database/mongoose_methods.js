Person.find({
  name: {
    $in: ["Anna", "Bob", "Clara"],

    // try catch or thenables or async/await
  },
});

try {
  const people = await Person.find({
    name: { $in: ["Anna", "Bob", "Clara"] },
  });
} catch (erro) {}

// CRUD in MONGOOSE

// CREATE CREATE  CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE

const myCar = new Car({
  make: "Honda",
  model: "Civic",
  year: 2015,
  color: "blue",
});

db.save(myCar);

Car.create({
  make: "Honda",
  model: "Civic",
  year: 2015,
  color: "blue",
});

Person.create(
  [
    { name: "Kim", age: 28 },
    { name: "tim", age: 26 },
  ],

  (err, people) => {}
);

// READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ
// find() returns an array

// callbacksRead
Model.find(conditions, [projection], [options], callback);

// promise style
Model.find(conditions, [projection], [options], callback);

// projections let us specify what fields(keys of the documents we want returned)
// options lets us specifiyoptions like sort results in ascending / descending order based on a property.
// limit number of results to 50.

Model.findOne(conditions, [projection], [options], callback);

// promise style
Model.findOne(conditions, [projection], [options], callback);

try {
  const people = await Person.find(
    { name: "Time", country: "Canada" }, // search for people named tim in canada
    "name age", // only return name and age
    { sort: { age: -1 }, limit: 10, skip: 20 } // return the 21st and 30th odlest people
  );
} catch (error) {}


// UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE 


Model.findOneAndUpdate(conditions,update,[options],callback)

// to update a single document wihtout obtaining it for use in a callback use:

Model.updateOne()

Model.updateMany()


// new: true to return the updated object

// upser:true this is to update or insert 

setMaxIdleHTTPParsers.findOneAndUpdate(
  {name:"LA Warehouse"}, // condition
  {$inc:{shipments:1}}, // update
  {upsert:true,new:true}, // options
  (err,shipper)=>{

  }
)









// DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE 

// returns the deleted data
Model.findOneAndDelete(conditions, [projection], [options], callback);

Model.deleteOne(conditions, [projection], [options], callback);

Model.deleteMany(conditions, [projection], [options], callback);

Car.findOneAndDelete({license:"p1910u091"},
(err,car)=>{

});


Car.delete({license:"p1910u091"},
(err,car)=>{

});

