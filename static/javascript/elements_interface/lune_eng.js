 // Tableau de correspondance entre les noms de jours en français et en anglais
 const frenchToEnglishDays = {
  "lundi": "Monday",
  "mardi": "Tuesday",
  "mercredi": "Wednesday",
  "jeudi": "Thursday",
  "vendredi": "Friday",
  "samedi": "Saturday",
  "dimanche": "Sunday"
};

// Latitude de Caen, France
var latitude = 49.1828;
// Longitude de Caen, France
var longitude = -0.3706;
// Variable renseignant la date d'aujourd'hui
var currentDate = new Date();
// Variable renseignant le jour du mois
var dayOfMonth = currentDate.getDate();
// Récupération des éléments de la page dans la div avec id
var moonElements = document.querySelectorAll("#contain_moon div");
// Création d'une requête'
var xhr = new XMLHttpRequest();
// Récupération des données de l'API
var url =
  "https://www.icalendar37.net/lunar/api/?lang=fr&month=" +
  (currentDate.getMonth() + 1) +
  "&year=" +
  currentDate.getFullYear() +
  "&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(17,17,17)&LDZ=" +
  Math.floor(currentDate.getTime() / 1000) +
  // Ajout des coordonnées géographiques
  "&lat=" + latitude + "&lon=" + longitude;
// Récupération de l'icône de la Lune avec rang 1 de la requête
moonElements[1].style.height = "100px";

// Retour de la requête lorsqu'elle est terminée
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var responseData = JSON.parse(xhr.responseText);
    // Récupération de la phase lunaire du jour en cours
    var currentDayPhase = responseData.phase[dayOfMonth];
    // Récupération du nom du jour en français
    var frenchDayName = currentDayPhase.name;
    // Correspondance avec le nom du jour anglais
    var englishDayName = frenchToEnglishDays[frenchDayName];
    // Mise à jour de l'élément de la phase lunaire
    moonElements[1].innerHTML = currentDayPhase.svg;
    // Appel d'une fonction si elle est définie (moon_widget_loaded)
    if (typeof moon_widget_loaded == "function") moon_widget_loaded(responseData);
    // Mise à jour de l'élément de la phase lunaire en texte avec rang 2
    moonElements[2].innerHTML = currentDayPhase.npWidget;
    // Affichage de la prochaine pleine lune rang 3
    moonElements[3].innerHTML = "Next full moon<br>" + responseData.nextFullMoon;
  }
};
// Envoi de la requête GET à l'API
xhr.open("GET", url, true);
xhr.send();