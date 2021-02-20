const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Route to create new workout
app.post('/api/workouts', (req, res) => {
  db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout)
      })
      .catch((err) => {
          res.status(400).json(err)
      })
});

// Route to populate workout dashboard
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
      .then(dbWorkout => {
        res.json(dbWorkout)
      })
      .catch((err) => {
          res.status(400).json(err)
      })
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
