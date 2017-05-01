var apiURL = "http://farmsense-prod.apigee.net/v1/daylengths/";

var getData = function(latitude, longitude){
  ajaxRequestInProgress = true;
  $.ajax({
    url: apiURL,
    method: "GET",
    dataType: "JSON",
    data: {
      d: Date.now(),
      lat: latitude,
      lon: longitude
    },
    success: displayData
  });
}

var displayData = function(data){
  console.log(data);
}

$(document).ready(function(){
  getData(-33.865269, 151.1960453);
})
