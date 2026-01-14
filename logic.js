let fajre = document.getElementById("fa");
let dhohr = document.getElementById("dh");
let asr = document.getElementById("as");
let maghrib = document.getElementById("ma");
let isha = document.getElementById("is");
let date = document.getElementById("date");
let countrySelect = document.getElementById("country");
let now = new Date();
// Display current date 
date.innerHTML = "Date: " + now.toLocaleDateString();



fetchCountries();



// Get user's country based on IP
fetch("https://ipwho.is/")
  .then(response => response.json())
  .then(data => {
    countrySelect.value = data.country;
    console.log(data.country);
    updateTimings();
  
  });



// Function to update prayer timings
  function updateTimings() {
    fetch("https://api.aladhan.com/v1/timingsByAddress/"+now.toDateString()+"?address=" + countrySelect.value + "&method=3")
      .then(response => response.json())
      .then(data => {
        
        fajre.innerHTML = data.data.timings.Fajr;
        dhohr.innerHTML = data.data.timings.Dhuhr;
        asr.innerHTML = data.data.timings.Asr;
        maghrib.innerHTML = data.data.timings.Maghrib;
        isha.innerHTML = data.data.timings.Isha;
      })
  }

// Function to fetch countries 
  function fetchCountries() {
  fetch("https://countriesnow.space/api/v0.1/countries/")
    .then(response => response.json())
    .then(data => { data.data.forEach((v, i)=>{
  countrySelect.options[i] = new Option(v.country, v.country);

        });

    }); 
}
countrySelect.addEventListener("change", function() {
   
    updateTimings()
    
});