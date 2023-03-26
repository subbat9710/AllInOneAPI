const API_BASE = 'https://localhost:44356/api/nasa';
let nasaData = {};
//let cardData = {};
let weatherData = {};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next_btn').addEventListener('click', getAll);

    //search location
    document.getElementById('search_btn').addEventListener('click', () => {
        const search_input = document.getElementById('search_input');
        const location = search_input.value;
        if (location) {
            getWeatherData(location);
        }
    });

   //Current Location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            getWeatherData(`${latitude},${longitude}`);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
        // Use default location
        getWeatherData('pittsburgh');
    }
    getAll();
});

function getWeatherData(location){
    const weather_location = document.getElementById('weather_location');
    const weather_country = document.getElementById('weather_country');
    const temperature_f = document.getElementById('temperature_f');
    const local_time = document.getElementById('local_time');
    const weather_text = document.getElementById('weather_text');
    const weather_icon = document.getElementById('weather_icon');
    const weather_humidity = document.getElementById('weather_humidity');
    const cloud = document.getElementById('cloud');

    fetch(`https://localhost:44356/api/nasa/${location}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        weather_location.innerHTML = '<strong>' + data.locationName + ',';
        weather_country.innerHTML = '<strong>' + data.country;
        temperature_f.innerHTML = 'Temperature: <strong>' + data.temp_f + ' °F';
        local_time.innerHTML = 'Date and Time: <strong>' + data.localTime;
        weather_text.innerHTML = 'Forecast: <strong>' + data.text;
        weather_icon.setAttribute('src', data.icon);
        weather_humidity.innerHTML = 'Humidity: <strong>' + data.humidity;

        const body = document.getElementById('weather');
        const weatherCondition = data.text.toLowerCase();
        switch (weatherCondition){
            case 'partly cloudy':
                body.style.backgroundImage = "url('https://thumbs.gfycat.com/DeadlyEmotionalArcherfish-size_restricted.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'sunny':
                body.style.backgroundImage = "url('https://media3.giphy.com/media/HvYdoLbPqSdNu/giphy.gif?cid=ecf05e47rg1htubn6o17r1631wgfdg2762p5m8sxdxak7en3&rid=giphy.gif&ct=g')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'light rain':
                body.style.backgroundImage = "url('https://www.icegif.com/wp-content/uploads/rain-icegif-1.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'raining':
                body.style.backgroundImage = "url('https://gifdb.com/images/high/aesthetic-anime-heavy-rain-splash-jeajbmb2ohg1x7z3.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'clear':
                body.style.backgroundImage = "url('https://thumbs.gfycat.com/ForcefulSpiffyAppaloosa-max-1mb.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'thunder strom':
                body.style.backgroundImage = "url('https://media3.giphy.com/media/FZzbTJyRTwPuw/giphy.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            default:
                body.style.backgroundImage = "url('https://gifdb.com/images/high/aesthetic-anime-heavy-rain-splash-jeajbmb2ohg1x7z3.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
        }
    });
}

function getAll(){
    const nasa_pic = document.getElementById('nasa_pic');
    const nasa_title = document.getElementById('nasa_title');
    const nasa_caption = document.getElementById('nasa_caption');
    const quote_daily = document.getElementById('quote_daily');
    const quote_author = document.getElementById('quote_author');
    const cat_pic = document.getElementById('cat_pic');
    const cat_fact = document.getElementById('cat_fact');
    const chuck_jokes = document.getElementById('chuck_jokes');
    const drinks_img = document.getElementById('drinks_img');
    const drinks_instruction = document.getElementById('drinks_instruction');

    fetch(API_BASE)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        nasaData = {};
        nasaData['imgUrl'] = data.imgUrl;
        nasaData['title'] = data.title;
        nasaData['explanation'] = data.explanation;
        nasaData['author'] = data.author;
        nasaData['quoteBody'] = data.quoteBody;
        nasaData['catPicImg'] = data.catPicImg;
        nasaData['catFact'] = data.catFact;
        nasaData['chuckJokes'] = data.chuckJokes;
        nasaData['strDrinkThumb'] = data.strDrinkThumb;
        nasaData['strInstructions'] = data.strInstructions;
        nasa_pic.setAttribute('src', data.imgUrl);
        nasa_title.innerText = data.title;
        nasa_caption.innerText = data.explanation;
        quote_author.innerText = "- " + data.author;
        quote_daily.innerText = '\u201C' + data.quoteBody + '\u201D';
        cat_pic.setAttribute('src', data.catPicImg);
        cat_fact.innerText = '\u201C' + data.catFact + '\u201D';
        chuck_jokes.innerText = '\u201C' + data.chuckJokes + '\u201D';
        drinks_img.setAttribute('src', data.strDrinkThumb);
        drinks_instruction.innerText = data.strInstructions;
    });
}

// function gerWeatherData(location) {
//     const weather_location = document.getElementById('weather_location');
//     const weather_country = document.getElementById('weather_country');
//     const temperature_f = document.getElementById('temperature_f');
//     const local_time = document.getElementById('local_time');
//     const weather_text = document.getElementById('weather_text');
//     const weather_icon = document.getElementById('weather_icon');
//     const weather_humidity = document.getElementById('weather_humidity');
//     const cloud = document.getElementById('cloud');
  
//     let url = '';
//     if (location) {
//       url = `https://localhost:44356/api/nasa/${location}`;
//     } else {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//           url = `https://localhost:44356/api/nasa/lat=${latitude}&lon=${longitude}`;
//           fetchWeatherData(url);
//         });
//       } else {
//         console.log('Geolocation is not supported by this browser.');
//         // Use default location
//         url = 'https://localhost:44356/api/nasa/pittsburgh';
//         fetchWeatherData(url);
//       }
//     }
  
//     function fetchWeatherData(url) {
//       fetch(url)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           weatherData = {};
//           weatherData['locationName'] = data.locationName;
//           weatherData['country'] = data.country;
//           weatherData['localTime'] = data.localTime;
//           weatherData['text'] = data.text;
//           weatherData['icon'] = data.icon;
//           weatherData['temp_f'] = data.temp_f;
//           weatherData['cloud'] = data.cloud;
//           weatherData['humidity'] = data.humidity;
//           weather_location.innerText = data.locationName;
//           weather_country.innerText = data.country;
//           temperature_f.innerText = data.temp_f;
//           local_time.innerText = data.localTime;
//           weather_text.innerText = data.text;
//           weather_icon.setAttribute('src', data.icon);
//           weather_humidity.innerText = data.humidity;
//           cloud.innerText = data.cloud;
//         });
//     }
  
//     if (location) {
//       fetchWeatherData(url);
//     }
//   }
  

// function gerWeatherData(){
//     const location = document.getElementById('location').value;
//     const weather_location = document.getElementById('weather_location');
//     const weather_country = document.getElementById('weather_country');
//     const temperature_f = document.getElementById('temperature_f');
//     const local_time = document.getElementById('local_time');
//     const weather_text = document.getElementById('weather_text');
//     const weather_icon = document.getElementById('weather_icon');
//     const weather_humidity = document.getElementById('weather_humidity');
//     const cloud = document.getElementById('cloud');

//     fetch(`https://localhost:44356/api/nasa/${location}`)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         weatherData = {};
//         weatherData['locationName'] = data.locationName;
//         weatherData['country'] = data.country;
//         weatherData['localTime'] = data.localTime;
//         weatherData['text'] = data.text;
//         weatherData['icon'] = data.icon;
//         weatherData['temp_f'] = data.temp_f;
//         weatherData['cloud'] = data.cloud;
//         weatherData['humidity'] = data.humidity;
//         weather_location.innerText = data.locationName;
//         weather_country.innerText = data.country;
//         temperature_f.innerText = data.temp_f;
//         local_time.innerText = data.localTime;
//         weather_text.innerText = data.text;
//         weather_icon.setAttribute('src', data.icon);
//         weather_humidity.innerText = data.humidity;
//         cloud.innerText = data.cloud;
//     });

// }


// function saveCard() {
//     // Get the image URL and fact text from the input fields
//     const imgInput = document.getElementById('cat_pic');
//     const factInput = document.getElementById('cat_fact');
//     const imgUrl = imgInput.getAttribute('src');
//     const factText = factInput.innerText;
  
//     // Create an object with the card data
//     const cardData = {
//       CatImgUrl: imgUrl,
//       CatFact: factText
//     };
  
//     // Send a POST request to the server to save the card data
//     fetch(API_BASE, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(cardData)
//     })
//     .then(response => {
//       if (response.ok) {
//         alert('Card saved successfully!');
//         refreshCollection();
//       } else {
//         alert('Error saving card!');
//       }
//     })
//     .catch(error => {
//       console.error('Error saving card:', error);
//       alert('Error saving card!');
//     });
//   }
  

// function refreshCollection() {
//     const collection = document.getElementById('collection');
//     collection.innerHTML = '';

//     fetch(API_BASE + '/cards')
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(card => {
//                 const cardDiv = document.createElement('div');
//                 cardDiv.classList.add('card');
//                 const cardImg = document.createElement('img');
//                 cardImg.src = card.CatImgUrl;
//                 const cardFact = document.createElement('p');
//                 cardFact.innerText = card.CatFact;
//                 const deleteBtn = document.createElement('button');
//                 deleteBtn.innerText = 'Delete';
//                 deleteBtn.addEventListener('click', () => {
//                     deleteCard(card);
//                 });

//                 cardDiv.appendChild(cardImg);
//                 cardDiv.appendChild(cardFact);
//                 cardDiv.appendChild(deleteBtn);
//                 collection.appendChild(cardDiv);
//             });
//         })
//         .catch(error => console.error('Error refreshing collection:', error));
// }
  
// //To retrieve all the save pic and facts into the webpage
// function getAllCards() {
//     const collection = document.getElementById('collection');

//     // Retrieve all saved cards from the server
//     fetch(API_BASE + '/cards')
//     .then(response => response.json())
//     .then(cards => {
//         // Clear the existing collection HTML
//         collection.innerHTML = '';

//         // Append each saved card to the collection
//         cards.forEach(card => {
//             const cardElem = document.createElement('div');
//             cardElem.className = 'card';
//             cardElem.innerHTML = `
//                 <img src="${card.catImgUrl}">
//                 <p>${card.catFact}</p>
//             `;
//             collection.appendChild(cardElem);
//         });
//     })
//     .catch(error => {
//         console.error('Error retrieving cards:', error);
//         alert('Error retrieving cards!');
//     });
// }

  
  

