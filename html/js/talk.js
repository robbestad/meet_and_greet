var customFields = localStorage.getItem("speech") ? JSON.parse(localStorage.getItem("speech")): []
var htmlFields = document.getElementById("speech-fields")
customFields.forEach(function(field){
    alert(field)

})