let fajre = document.getElementById("fa");
let dhohr = document.getElementById("dh");
let asr = document.getElementById("as");
let maghrib = document.getElementById("ma");
let isha = document.getElementById("is");
let date = document.getElementById("date");
let countrySelect = document.getElementById("country");
let currentCountry = "";

let now = new Date();
// Display current date 
date.innerHTML = "اليوم : " + now.toLocaleDateString();

console.log(now.toLocaleDateString());


Promise.all([ 
  getCountry(),fetchCountries()]).then(() => {
   
    countrySelect.value = currentCountry;
     updateTimings()
     countrySelect.value = currentCountry;
     

  });



// Function to fetch countries 
   function fetchCountries() {
    return fetch("https://countriesnow.space/api/v0.1/countries/")
    .then(response => response.json())
    .then(data => { data.data.forEach((v, i)=>{
  countrySelect.options[i] = new Option(v.country, v.country);
 console.log("Countries loaded");
 countrySelect.value = currentCountry;
        });
      
    }); 
  
}

function getCountry() {
   return fetch("https://ipwho.is/")
  .then(response => response.json())
  .then(data => {
    countrySelect.value = data.country;
    currentCountry = data.country;
    console.log(data.country);
  
  
  });
}

// Function to update prayer timings
  function updateTimings() {
    return fetch("https://api.aladhan.com/v1/timingsByAddress/"+now.toDateString()+"?address=" + countrySelect.value + "&method=3")
      .then(response => response.json())
      .then(data => {
        
        fajre.innerHTML = data.data.timings.Fajr;
        dhohr.innerHTML = data.data.timings.Dhuhr;
        asr.innerHTML = data.data.timings.Asr;
        maghrib.innerHTML = data.data.timings.Maghrib;
        isha.innerHTML = data.data.timings.Isha;
        //console.log(currentCountry+ " 2"); 
      })
     
  }



countrySelect.addEventListener("change", function() {
   
   updateTimings();
  
    
});
