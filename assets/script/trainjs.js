
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

  $("#addTrain").on("click", function(){

    var name = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var frequency = $("#train-frequency").val().trim();
    var firstTime = $("#train-first").val().trim();
    var originTrain = moment(firstTime).format("h:mm:ss"); 
    var trainInfo = {
        "name" : name,
        "destination" : destination,
        "frequency" : frequency,
        "originTrain" : originTrain
    }
    console.log(trainInfo);
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(firstTime);
    database.ref().push(trainInfo);
    $(".train-form").val("");
  });

  database.ref().on("child_added", function(childSnapshot){
    var DBname = childSnapshot.val().name;
    var DBdestination = childSnapshot.val().destination;
    var DBfrequency = childSnapshot.val().frequency;
    var DBoriginTrain = childSnapshot.val().originTrain;
    var currentTime = moment().format("HH:mm");
    var setTrain = moment(DBoriginTrain, "HH:mm").subtract(1,"years");
    var timeDiff = moment().diff(moment(setTrain), "minutes");
    var timeLeft = timeDiff % DBfrequency;
    var minToTrain = DBfrequency - timeLeft;
    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm")

    $("#trainTable > trainBody").append(
        "<tr>" +
        "<td>" + DBname + "</td>"+
        "<td>" + DBdestination + "</td>" +
        "<td>" + nextTrain + "</td>" +
        "<td>" + frequency + "</td>" + 
        "<td>" + minToTrain + "</td>"+
        "</tr>");
    
  });
