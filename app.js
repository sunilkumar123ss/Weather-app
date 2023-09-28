

let currentUnit = "Celsius";
let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");


searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const toggleUnit = () => {
    const tempUnit = document.getElementById("temp-unit");
    const tempValue = parseInt(tempvalue.textContent);

    if (currentUnit === "Celsius") {
        // Switch to Fahrenheit
        currentUnit = "Fahrenheit";
        tempUnit.textContent = "\u2109"; // ℉ symbol
        tempvalue.textContent = Math.round((tempValue * 9/5) + 32);
    } else {
        // Switch to Celsius (default)
        currentUnit = "Celsius";
        tempUnit.textContent = "\u2103"; // ℃ symbol
        tempvalue.textContent = Math.round((tempValue - 32) * 5/9);
    }
};

const unitToggleBtn = document.getElementById("unit-toggle-button");
unitToggleBtn.addEventListener("click", toggleUnit);

const getWeather=async(city)=>{

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74b9fb9800b8be770c10f20b5667b24c`,

    
        {mode:'cors'}
        );

        const weatherData=await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        if(id<210&&id>200){
            tempicon.src="./Icons/scattered-thunderstorms.png"
         }
         else if(id<300&&id>=210){
            tempicon.src="./Icons/thunderstorm.png"
         }
         else if(id<400&&id>=300){
            tempicon.src="./Icons/cloudrainsun.png"
         }
         else if(id<600&&id>=500){
            tempicon.src="./Icons/raining.png"
         }
         else if(id<700&&id>=600){
            tempicon.src="./Icons/snow.png"
         }
         else if(id<800&&id>700){
            tempicon.src="./Icons/cloudandsun.png"
         }
         else if(id==800){
            tempicon.src="./Icons/sun.png"
         }
         else if(id<900&&id>800){
            tempicon.src="./Icons/cloud.png"
         }
    }
catch(error){
    alert('City Not Found');
}
};








window.addEventListener("load" ,()=>{

    let long;
    let lat;
    if (navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";
             const api=`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=592fde1f5a5e7d74729ee5590ae785d4`
             fetch(api).then((response)=>{
                return response.json();
             })
             .then (data=> {

                     const { name } = data;
                     const { feels_like } = data.main;
                     const { id, main } = data.weather[0];
                     loc.textContent = name;
                     climate.textContent = main;
                     tempvalue.textContent = Math.round(feels_like - 273);
                     if(id<210&&id>200){
                        tempicon.src="./Icons/scattered-thunderstorms.png"
                     }
                     else if(id<300&&id>=210){
                        tempicon.src="./Icons/thunderstorm.png"
                     }
                     else if(id<400&&id>=300){
                        tempicon.src="./Icons/cloudrainsun.png"
                     }
                     else if(id<600&&id>=500){
                        tempicon.src="./Icons/raining.png"
                     }
                     else if(id<700&&id>=600){
                        tempicon.src="./Icons/snow.png"
                     }
                     else if(id<800&&id>700){
                        tempicon.src="./Icons/cloudandsun.png"
                     }
                     else if(id==800){
                        tempicon.src="./Icons/sun.png"
                     }
                     else if(id<900&&id>800){
                        tempicon.src="./Icons/cloud.png"
                     }
                     console.log(data);
                 })
            }
            )}
        })
    