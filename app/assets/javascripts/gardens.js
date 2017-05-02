// var apiURL = "http://farmsense-prod.apigee.net/v1/daylengths/";
//
// var getData = function(latitude, longitude){
//   ajaxRequestInProgress = true;
//   $.ajax({
//     url: apiURL,
//     method: "GET",
//     dataType: "JSON",
//     data: {
//       d: Date.now(),
//       lat: latitude,
//       lon: longitude
//     },
//     success: displayData
//   });
// }
//
// var displayData = function(data){
//   console.log(data);
// }
//
// $(document).ready(function(){
//   getData(-33.865269, 151.1960453);
// })

var apiURL = "https://openfarm.cc/api/v1/crops?";

var fetchData = function(term){
  console.log("Fetching plant data...");
  ajaxRequestInProgress = true;
	$.ajax({
		url: apiURL,
		method: "GET",
		dataType: "JSON",
    data: {
      filter: term
    },
		success: displayData
  });
}

var displayData = function(data){
  var result = data.data;
  console.log(result);
  result.forEach(function(el){
    var plantDetails = el.attributes;
    var $plant = $("<p>").html("<strong>Name: " + plantDetails.name + "</strong>");
    var $plantInfo = $("<div>").html("<p>Height:" + plantDetails.height + "</p>" + "<p>Sun Requirements: " + plantDetails.sun_requirements + "</p>" + "<p>Spread: " + plantDetails.spread + " cm</p>" + "<p>Row Spacing: " + plantDetails.row_spacing + " cm</p>");
    $("#plant-details").append($plant).append($plantInfo);
  })
}

// draw the garden canvas based on user entry
var drawCanvas = function(w, h){
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  console.log('drawing canvas now');
  if( w === h){
    var newWidth = 500;
    var newHeight = 500;
    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";
    context.fillStyle = "#c5e1a5";
    context.fillRect(10, 10, newWidth, newHeight);
  } else {
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    context.fillStyle = "#c5e1a5";
    context.fillRect(10, 10, w, h);
  }
}

$(document).ready(function(){

  $("#draw-canvas").on("click", function(){
    var height = $("#height").val();
    var width = $("#width").val();

    var newCanvas = drawCanvas(width, height);

    $("#height").val("");
    $("#width").val("");
  });

  $("#accordion").accordion(); // jquery accordion function to make collapsible

  $("#plant-search").on("click", function(){
    var searchTerm = $("#plant-name").val();

    fetchData(searchTerm);

  });

  $("#tomato-container").on("click", function(){
    var $plantContainer = $("#tomato-container");
    $plantContainer.css({
      position: "absolute"
    });
    $plantContainer.draggable(); // jquery draggable function to make the plant draggable
  })

})
