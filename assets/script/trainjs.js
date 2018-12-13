
  var config = {
    apiKey: "AIzaSyABF_ZljXZvV_K2KCFIumkzaqZbaBAYKUs",
    authDomain: "my-user-domain.firebaseapp.com",
    databaseURL: "https://my-user-domain.firebaseio.com",
    projectId: "my-user-domain",
    storageBucket: "my-user-domain.appspot.com",
    messagingSenderId: "478272580042"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  

  $("#addTrain").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTrain = moment($("#train-first").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#train-frequency").val().trim();
      console.log(trainName);
    var newTrain = {
          name: trainName,
          place: destination,
          firstTrain: firstTrain,
          frequency: frequency
    }
      database.ref().push(newTrain);
      console.log(newTrain.name);
      
      $("#trainName").val("");
      $("#destination").val("");
      $("#time").val("");
      $("#frequency").val("");

      return false;
  });

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    
    var DBname = childSnapshot.val().name;
    var DBdestination = childSnapshot.val().place;
    var DBfrequency = childSnapshot.val().frequency;
    var DBfirstTrain = childSnapshot.val().firstTrain;

    var currentTime = moment().format("HH:mm");
    var setTrain = moment(DBfirstTrain, "HH:mm").subtract(1,"years");
    var timeDiff = moment().diff(moment(setTrain), "minutes");
    var timeLeft = timeDiff % DBfrequency;
    var minToTrain = DBfrequency - timeLeft;
    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm")

    $("#trainTable > tbody").append(
        "<tr>" +
        "<td>" + DBname + "</td>"+
        "<td>" + DBdestination + "</td>" +
        "<td>" + nextTrain + "</td>" +
        "<td>" + DBfrequency + "</td>" + 
        "<td>" + minToTrain + "</td>"+
        "</tr>");
    
  });
