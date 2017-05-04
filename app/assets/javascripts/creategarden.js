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

// create results table
var $table = $('<table>');

// select data with images
var selectData = function(response) {
  var data = response.data;
  var results = [];

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
    $tr.css("fontWeight", "bold");
    $tr.append($label).append($val);
    $table.append($tr);

    // print plant height
    if (details.height != null && details.height != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Height' );
      $val = $('<td class="value">').html( details.height + " cm");
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant row spacing
    if (details.row_spacing != null && details.row_spacing != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Row Spacing' );
      $val = $('<td class="value">').html( details.row_spacing + " cm");
      $tr.append($label).append($val);
      $table.append($tr);
    }

    // print plant spread
    if (details.spread != null && details.spread != ""){
      $tr = $('<tr>');
      $label = $('<td class="label">').html( 'Spread' );
      $val = $('<td class="value">').html( details.spread + " cm");
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
      $val = $('<td class="value">');
      // $imgContainer = $('<div>');
      $image = $('<img>').attr( "src", details.main_image_path).attr("name", details.name).attr("id", details.id);
      $image.css({
        width: "50px",
        height: "50px"
      });
      $button = $('<button>').addClass("waves-effect waves-teal btn-flat").text("+ add to my planting box")
      $button.attr({
        src: details.main_image_path,
        name: details.name,
        id: "plant-select-button"
      });
      $val.append($image).append($button);
      $tr.append($label).append($val);
      $table.append($tr);
    }

    $("#plant-details").append($table);
  });
}
// store gardeninfo - height, width and ratio
var gardenInfo = {};

var maxWidth = 800;

// calculate width-height ratio
var calculateRatio = function(w, h){
  if (parseInt(h) > parseInt(w)){
    return ratio = parseInt(h) / parseInt(w); // spin the garden plan around to fit the screen

  } else {
    return ratio = parseInt(w) / parseInt(h);
  }
}
// draw the garden canvas based on user entry
var drawCanvas = function(w, h){
  console.log('getting width-height ratio now...');
  calculateRatio(w, h);
  console.log(ratio);

  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  console.log('drawing canvas now...');

  if(ratio === 1){
    var newWidth = maxWidth;
    var newHeight = maxWidth;
  } else {
    var newWidth = maxWidth;
    var newHeight = maxWidth / ratio;
  }
  canvas.width = newWidth;
  canvas.height = newHeight;
  canvas.style.width = newWidth + "px";
  canvas.style.height = newHeight + "px";
  context.fillStyle = "#c5e1a5";
  context.fillRect(0, 0, newWidth, newHeight);

}

var createDimension = function(w, h) {
  $("#dimension").html("");

  var $gardenSize = $('<h6>').html("<strong>Dimension:</strong> " + w + "m x " + h + "m");

  $("#dimension").append($gardenSize); // add garden dimension in planting box

}

// create brick of image when event handler clicked
var createBrick = function(src, name){
  $brick = $("<div>").addClass("brick small").css("display", "absolute");
  $img = $("<img>").attr("src", src).attr("name", name);
  $overlay = $("<div>").addClass("overlay");
  $text = $("<div>").addClass("text").text(name);
  $overlay.append($text);
  $brick.append($img).append($overlay);
  $brick.draggable({
    snap: true,
    snapMode: "outer",
    containment: "#garden-plan",
    snapTolerance: 10,
    grid: [ 20, 20 ],
    opacity: 0.35,
    scroll: false
  });
  $("#box").append($brick);
}


// trigger create garden in database
var saveGarden = function(gardenInfo){
  $.ajax({
    url: "/gardens",
    method: "POST",
    dataType: "JSON",
    data: {
      height: gardenInfo.height,
      width: gardenInfo.width
    },
    success: function(){
      console.log("Autosaving...");
    },
    error: function(){
      console.log("Something's gone wrong...");
    }
  })
}

$(document).ready(function(){

  $("#draw-canvas").on("click", function(){

    var height = $("#height").val();
    var width = $("#width").val();

    var newDimension = createDimension(width, height);

    var newCanvas = drawCanvas(width, height);

    $("canvas").droppable(); // make canvas a droppable area

    $("#height").val("");
    $("#width").val("");
    $('.collapsible').collapsible('open', 1); // close current tab to open the next tab

    var gardenInfo = {
      height: height,
      width: width,
      ratio: ratio
    }
    return saveGarden(gardenInfo);
  });

  // get search results from api
  $("#plant-search").on("click", function(){
    var searchTerm = $("#plant-name").val();

    fetchData(searchTerm);

    $("#plant-name").val(""); // clear the search input field
    $('#plant-details table').html(""); // clear the results table before entering new search results
    $('.collapsible').collapsible('open', 2);

  });

  // click on result image handler
  $(document).on("click", "img", function(){
    var img_src = $(this).attr("src");
    var name = $(this).attr("name");

    createBrick(img_src, name);
  })

  // click on result button handler
  $(document).on("click", "button#plant-select-button", function(){
    var img_src = $(this).attr("src");
    var name = $(this).attr("name");

    createBrick(img_src, name);
  })

  // drag and drop event listener
  $(document).on("drop", function(event, ui){

    // prevent default action
    event.preventDefault();
    // event.stopPropagation();

    if (event.target.className === "ui-droppable"){
      debugger
      console.log("dropped!");
      var top = ui.position.top;
      var left = ui.position.left;
      var name = ui.draggable.context.innerHTML.name;
      var img_src = ui.draggable.context.innerHTML.src;



    }
  //   var left = $(this).position().left;
  //   var name = $(this).attr("name");
  //   var img_src = $(this).attr("src");
  //   debugger
  //
  //   if (event.target.className === "ui-droppable"){
  //     alert("dropped!")
  //   }
  })

})
