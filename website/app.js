/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const url = 'https://api.openweathermap.org/data/2.5/weather?zip=' ;

const keyAPI = ',us&appid=f6a02d657edf38d2610187e9f0907c82';
const button = document.getElementById('generate');



button.addEventListener('click',()=>{
    const val = document.getElementById('feelings').value;  
    const zipCode = document.getElementById('zip').value;
    const message = document.querySelector('#message');
    const entry = document.querySelector('#entry');
    if(zipCode == ''){
        message.classList.remove('display-none');
        entry.classList.add('display-none')
        message.classList.add('message');
        setTimeout(()=>message.textContent = 'You have not entered a Zip code',100);
    }

    else if(zipCode.toString().length < 5 || zipCode.toString().length > 5){
        message.classList.remove('display-none'); // just to make sure to delete it in case of changing cases 
        entry.classList.add('display-none')
        setTimeout(()=>message.innerHTML = 'You have entered an invalid Zip code',100);
        message.classList.add('message');
    }

    else{
        const API = url + zipCode + keyAPI ;  
        getInfo(API)
        .then(function(allData){
            if (allData.cod == 404){   // to check if the zip code is exist or not 
                message.classList.remove('display-none');
                message.classList.add('message');
                setTimeout(()=>message.textContent = 'The Zip code is not found',100);
                entry.classList.add('display-none');
            }
            else {  // it will post the data to the server if zip code were exist 
                entry.classList.remove('display-none') ;
                message.classList.add('display-none');
                postData({
                temprature : Math.round(allData.main.temp-273),
                city: allData.name,
                fellings : val,
                sky : allData.weather[0].main,
                code : allData.cod 
            });}
        }).then(getSpesificInfo());
}

})

const getInfo = async (API)=>{
    const response = await fetch(API);

    try{
        const allData = await response.json(); // to convert the data to json format  
        return allData; 
    }catch(error){
        console.log('you have an error'+ error);
    }
}


const postData = async (data={})=>{
    const response = await fetch('/mans',{
        method : 'POST',
        headers : {
            'Content-Type'  : 'application/json'
        },
        credentials : 'same-origin',
        body : JSON.stringify(data)
    })
    try{
        const myData = await response.json();
        //console.log(myData);
        return myData;
    } 
    catch(error){
        console.log('You have an error ' +error);
    }  
};

// this function to get the data that i need and show it like temp, sky and the city name
const getSpesificInfo = async ()=>{
    const response = await fetch('/mans');
    try{
        const allData = await response.json(); 
        document.getElementById('content').textContent = `Your fellings : ${allData.fellings} `;
        document.getElementById('city').textContent = `The City name is : ${allData.cityName}`;
        document.getElementById('date').textContent = `The Date is : ${newDate}`;
        document.getElementById('temp').textContent =  `The Temprature now is : ${Math.round((allData.tempreture))} C`; //to convert to to celisus 
        document.getElementById('sky').textContent = `The Sky today is ${allData.sky} `;
        
        if(allData.fellings == ''){
            document.getElementById('content').classList.add('display-none')
        }
        else{
            document.getElementById('content').classList.remove('display-none')
        }
            
        return allData; 
    }catch(error){
        console.log('you have an error mans'+ error);
    }
}