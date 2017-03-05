document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){
  var myHeader =  new Headers({
    'Content-Type': 'application/json',
    'Host': 'westus.api.cognitive.microsoft.com',
    'Ocp-Apim-Subscription-Key':'8f25475f3033465d8f8ab1dade6eb8e1'
  });

  var reqBody = {
    "url": document.getElementById("input").value
  };

  var initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myHeader
  }

  var request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender', initObject);

  fetch(request).then(function(response){
      if(response.ok){
          return response.json();
      }
      else{
          return Promise.reject(new Error(response.statusText));
      }
  }).then(function(response){
      if (response.length !== 0) {
        document.getElementById('outputImage').innerHTML = `<img style='width:200px' src='${reqBody.url}'/>`;
        document.getElementById("outputAtributes").innerHTML = "<li>Gender: " +
        response[0].faceAttributes.gender + "</li>" + "<li>Age: " + response[0].faceAttributes.age + "</li>";
      }else{
        document.getElementById('outputImage').innerHTML = "";
        document.getElementById("outputAtributes").innerHTML = "No Faces Detected";
      }
  }).catch(function(err){
      alert(err.message);
      document.getElementById('outputImage').innerHTML = "";
      document.getElementById("outputAtributes").innerHTML = "";
  });

}
