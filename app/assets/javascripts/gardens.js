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


var displayData = function(response){
  var data = response.data.slice(0, 3); // select the top 3 results

  console.log(data);
  data.forEach(function(el){

    var $tr;
    var $label;
    var $val;

    // print plant name
    $tr = $('<tr>');
    $label = $('<td class="label">').html( 'Name' );
    $val = $('<td class="value">').html( el.attributes.name );
    $tr.append($label).append($val);
    $table.append($tr);

    // print plant height
    if (el.attributes.height != null && el.attributes.height != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Height' );
      $val = $('<td class="value">').html( el.attributes.height );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant row spacing
    if (el.attributes.row_spacing != null && el.attributes.row_spacing != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Row Spacing' );
      $val = $('<td class="value">').html( el.attributes.row_spacing );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant sun requirements
    if (el.attributes.sun_requirements != null && el.attributes.sun_requirements != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Sun Requirements' );
      $val = $('<td class="value">').html( el.attributes.sun_requirements );
      $tr.append($label).append($val);
      $table.append($tr);
    }

    if (el.attributes.main_image_path != null && el.attributes.main_image_path != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Image' );
      $val = $('<td class="value">')
      $image = $('<img>').attr( "src", el.attributes.main_image_path);
      $val.append($image);
      $tr.append($label).append($val);
      $table.append($tr);
    }



    $("#plant-details").append($table);
  })
}


var createTable = function(data){
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

// var createGrid = function () {
//     var options = {
//         cellHeight: 80,
//         verticalMargin: 10
//     };
//     $('.grid-stack').gridstack(options);
// };

var createGrid = function(){
  $('.gridly').gridly({
    base: 60, // px
    gutter: 20, // px
    columns: 12
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
