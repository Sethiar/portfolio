(function() {
  // Latitude de Caen, France
  var latitude = 49.1828;
  // Longitude de Caen, France
  var longitude = -0.3706;;

  var currentDate = new Date();
  var dayOfMonth = currentDate.getDate();
  var moonElements = document.querySelectorAll("#contain_moon div");
  var xhr = new XMLHttpRequest();
  var url =
    "https://www.icalendar37.net/lunar/api/?lang=fr&month=" +
    (currentDate.getMonth() + 1) +
    "&year=" +
    currentDate.getFullYear() +
    "&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(17,17,17)&LDZ=" +
    Math.floor(currentDate.getTime() / 1000) +
    // Ajout des coordonnées géographiques
    "&lat=" + latitude +
    "&lon=" + longitude;

  moonElements[1].style.height = "100px";

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseData = JSON.parse(xhr.responseText);
      moonElements[1].innerHTML = responseData.phase[dayOfMonth].svg;
      if (typeof moon_widget_loaded == "function") moon_widget_loaded(responseData);
      moonElements[2].innerHTML = responseData.phase[dayOfMonth].npWidget;
      moonElements[3].innerHTML =
        "Prochaine pleine lune<br>" + responseData.nextFullMoon;
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
})();;