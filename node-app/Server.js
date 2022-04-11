import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import "../node-app/models/initialPlayers.js";

const connectionStr = `mongodb://localhost:27017/initialPlayers`;
mongoose.connect(connectionStr)
  .then(() => {
    console.log(`connected to the mongodb database`);
    console.log(connectionStr.initialPlayers);
  })
  .catch((err) => {
    console.log(err.message);
  });

  // const collections = mongoose.model("Players", playerSchema);
  // players is the collection
  const Players = mongoose.model("Players");

var app = express();

app.use(express.static('public'));

import bodyParser from 'body-parser';
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/players', (req, res) => {
    Players.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("First function call : ", docs);
            res.json(docs);
        }
    });
   

});

app.listen(8000, () => {
    console.log('Listening to Port 8000');
});

