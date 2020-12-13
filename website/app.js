/* Global Variables */
const zipCodeElement = document.getElementById('zip'); 
const feelingsCodeElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=31fd5ea5b2b3c07da298255987fb620a&units=imperial";
const apiUrl = "http://localhost:8888/";


//function return error
const catchError = (error) => console.error ('An error occurs =>', error);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', Generating);

//post data to api
function Generating() {
    let dataInfo = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        date: new Date()
    };

    //post data to get Zip code information
    getZipInfo(dataInfo.zipCode).then(zipInfo => {
        if (zipInfo.cod !=200) {
            return alert(zipInfo.message)
        }

        //post data to server
        dataInfo.temp = zipInfo.list[0].main.temp;
        postToServer(dataInfo);
    }).catch(catchError);
};

// function to get zip information
async function getZipInfo(zipCode) {
    return await fetch (`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`).json()
};

//post data to server
async function postToServer(dataInfo) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataInfo)
    });
    try {

        response.json().then(dataInfo => {
            if (response.ok) {
                updateUI();
            }
            else {
                alert('process Not successful')
            }
        }).catch(catchError);
    }catch (error) {
        catchError(error);
    }
};

//Update UI
async function updateUI() {
    let response = await fetch(`${apiUrl}All`);
    try {
        response.jason().then(dataInfo => {
            dateElement.innerHTML = `Data is: ${dataInfo.date}`;
            tempElement.innerHTML = `Temp is: ${dataInfo.temp}`;
            contentElement.innerHTML = `Feelings is: ${dataInfo.content}`;
        }).catch(catchError);
    }catch (error) {
        catchError(error);
    }
};
