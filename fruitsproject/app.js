// const { MongoClient } = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("fruits-project");
//     const movies = database.collection("movies");
//     const doc = { name: "Red", town: "kanto" };
//     const result = await movies.insertOne(doc);
//     console.log(
//       `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
//     );

//     const movie = await movies.findOne(doc);
//     console.log(movie);

//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

// mongodb+srv://soumyajit:lafkqwmemP17TL9S@soumyajit.rz4cw.mongodb.net/soumyajit?retryWrites=true&w=majority

const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/fruitdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name not Specified!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 12,
  },
  reviews: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({ name: "Apple", rating: 10, reviews: "Pretty solid" });
// fruit.save().then(() => console.log("Database Created!"));

const personSchema = new Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   reviews: "Greatest best good",
// });
// pineapple.save().then(() => console.log("Database Created!"));

const mango = new Fruit({
  name: "Mango",
  rating: 6,
  reviews: "Greatest best good",
});
mango.save().then(() => console.log("Database Created!"));

Person.updateOne(
  { _id: "60be410cc415163350b5d615" },
  { favouriteFruit: mango },
  function (error, docs) {
    if (error) {
      console.log("Error!");
    } else {
      console.log("Successfully updated!");
    }
  }
);

// const person = new Person({
//   name: "Apple",
//   age: 7,
//   favouriteFruit: pineapple,
// });

// person.save().then(() => console.log("Database Created!"));

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   reviews: "Pretty best good",
// });
// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   reviews: "Pretty solid good",
// });
// const banana = new Fruit({
//   name: "Banana",
//   rating: 3,
//   reviews: "Best solid good",
// });
// Fruit.insertMany([kiwi, orange, banana], function (error, docs) {
//   if (error) {
//     console.log("Error!");
//   } else {
//     console.log("Data Saved!");
//   }
// });

Fruit.find(function (error, docs) {
  if (error) {
    console.log("Error!");
  } else {
    // console.log(docs);
    mongoose.connection.close();
    docs.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne(
//   { _id: "60be3c4f5f26ed2b6cd7ec12" },
//   {
//     name: "Peach",
//   },
//   function (error, docs) {
//     if (error) {
//       console.log("Error!");
//     } else {
//       console.log("Successfully updated!");
//     }
//   }
// );

// Fruit.deleteOne({ name: "Banana" }, function (error, docs) {
//   if (error) {
//     console.log("Error!");
//   } else {
//     console.log("Successfully deleted!");
//   }
// });

// Person.deleteMany({ name: "Apple" }, function (error, docs) {
//   if (error) {
//     console.log("Error!");
//   } else {
//     console.log("Successfully deleted all!");
//   }
// });
