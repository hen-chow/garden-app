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
		success: selectData
  });
}

// var data = response['data']['attributes']; // or whatever
//
var $table = $('<table>');
//
// var $tr;
// var $label;
// var $val;
//
// if( data['sun_requirements'].length ){
//
//   $tr = $('<tr>');
//   $label = $('<td class="label">').html( 'Sun Requirements' );
//   $val = $('<td class="value">').html( data['sun_requirements'] );
//   $tr.append($label).append($val);
//   $table.append($tr);
//
// }
//
// $('#output').append($table); // or whatever

// select data with images
var selectData = function(response) {
  var data = response.data;
  var results = [];
  var height = "";

  console.log(data);
  data.forEach(function(el){

    var details = el.attributes;

    if (details.main_image_path != "/assets/baren_field_square-3dbd07fc93d8c64a2812339ab9748b18.jpg") {
      results.push(el);
    };
  })
  console.log('Selecting results');
  displayData(results);
};

// display data in a result table
var displayData = function(response){
  var data = response.slice(0, 5); // select the top 5 results

  console.log('selecting top 5');
  data.forEach(function(el){

    var details = el.attributes;

    var $tr;
    var $label;
    var $val;

    // print plant name
    $tr = $('<tr>');
    $label = $('<td class="label">').html( 'Name' );
    $val = $('<td class="value">').html( details.name );
    $tr.append($label).append($val);
    $table.append($tr);

    // print plant height
    if (details.height != null && details.height != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Height' );
      $val = $('<td class="value">').html( details.height );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant row spacing
    if (details.row_spacing != null && details.row_spacing != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Row Spacing' );
      $val = $('<td class="value">').html( details.row_spacing );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant sun requirements
    if (details.sun_requirements != null && details.sun_requirements != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Sun Requirements' );
      $val = $('<td class="value">').html( details.sun_requirements );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    if (details.main_image_path != null && details.main_image_path != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Image' );
      $val = $('<td class="value">')
      $image = $('<img>').attr( "src", details.main_image_path);
      $image.css({
        width: "50px",
        height: "50px"
      });
      $val.append($image);
      $tr.append($label).append($val);
      $table.append($tr);
    }

    $("#plant-details").append($table);
  });
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

var createGrid = function(){
  $('.gridly').gridly({
    base: 80, // px
    gutter: 20, // px
    columns: 8
  });

  $('.gridly').css({
    backgroundColor: "red"
  });
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

  createGrid();

})
