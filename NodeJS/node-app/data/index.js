
  



  // collections.find();
  Players.create({
    name: "kohli",
    age: 32,
    awards:["arjuna","padmaShree"]
  }).then((ans) => {
    console.log("Document inserted")
  }).catch((err) => {
    console.log(err.Message);
  });


  Players.find({}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("second function call : ", docs);
    }
});



  

  

  
