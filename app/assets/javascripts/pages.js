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

var fetchData = function(){
  ajaxRequestInProgress = true;
	$.ajax({
		url: "https://plantsdb.xyz/search",
		method: "GET",
		dataType: "JSON",
		success: displayData
  });
}

var displayData = function(data){
  var response = data.data;
  var result = [];
  response.forEach(function(el){
    if (el.State_T_E_Common_Name === ""){
      result.push(el);
    }
  })
  console.log(result);
}

$(document).ready(function(){
    fetchData();
})
