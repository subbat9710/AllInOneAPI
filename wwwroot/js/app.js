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

    //coin changer
   function attachClickEvent() {
      document.getElementById('change_btn').addEventListener('click', () => {
         const amount_input = document.getElementById('amount_input');
         const amount = amount_input.value;
         if (amount) {
              getCoin(amount);
         }
     });
    }
    attachClickEvent();

    document.getElementById('change_btn').addEventListener('dblclick', () => {
    attachClickEvent();
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
            case 'overcast':
                body.style.backgroundImage = "url('https://www.adventurebikerider.com/wp-content/uploads/2017/10/tumblr_o27c7fByaO1tchrkco1_500.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'light snow':
                body.style.backgroundImage = "url('https://media.tenor.com/UQcABowZjPIAAAAC/snow-snowing.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'heavy snow':
                body.style.backgroundImage = "url('https://media.tenor.com/twR0LCb2RgkAAAAM/moon-winter.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'mist':
                body.style.backgroundImage = "url('https://i.gifer.com/CKtq.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'fog':
                body.style.backgroundImage = "url('https://imageresizer.static9.net.au/bFAAnuFoboPhJz30cM5TR0ia7ls=/360x203/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06a47928-bcab-4364-bf17-e2b1021f446a')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            case 'patchy rain possible':
                body.style.backgroundImage = "url('https://64.media.tumblr.com/ccffe7fe87cffe475a16916afecf2570/fbeddcbc3b13643b-47/s540x810/fb4ec14a0aa57a9b7f09b13bafd5083acd666480.gif')";
                body.style.backgroundSize = 'cover'; 
                body.style.position = 'relative'; 
                body.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
                break;
            default:
                body.style.backgroundImage = "url('https://64.media.tumblr.com/ccffe7fe87cffe475a16916afecf2570/fbeddcbc3b13643b-47/s540x810/fb4ec14a0aa57a9b7f09b13bafd5083acd666480.gif')";
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

        if (data.imgUrl.includes('vimeo.com')) {
            const videoId = data.imgUrl.split('/').pop();
            const iframe = document.createElement('iframe');
            iframe.src = `https://player.vimeo.com/video/${videoId}`;
            iframe.width = '100%';
            iframe.height = '470';
            iframe.frameborder = '0';
            iframe.allowfullscreen = true;
            nasa_pic.appendChild(iframe);
        } else {
            const image = document.createElement('img');
            image.src = data.imgUrl;
            nasa_pic.appendChild(image);
        }
      //  nasa_pic.setAttribute('src', data.imgUrl);
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
function getCoin() {
        const form = document.getElementById('coin-form');
        const quarterImg = document.getElementById('quarter_img');
        const dimeImg = document.getElementById('dime_img');
        const nickelImg = document.getElementById('nickel_img');
        const pennyImg = document.getElementById('penny_img');
        const quarterText = document.getElementById('quarter_text');
        const dimeText = document.getElementById('dime_text');
        const nickelText = document.getElementById('nickel_text');
        const pennyText = document.getElementById('penny_text');
      
        form.addEventListener('submit', event => {
          event.preventDefault();
          const amountInput = document.getElementById('amount_input');
          const amount = amountInput.value;
          if(amount){
            fetch(`https://localhost:44356/api/nasa/${amount}/coins`)
              .then(response => response.json())
              .then(data => {
                if(data.Quarter > 0) {
                  quarterText.innerText = `Quarter: ${data.Quarter}`;
                  quarterImg.style.display = 'block';
                } else {
                  quarterText.innerText = '';
                  quarterImg.style.display = 'none';
                }
      
                if(data.Dime > 0) {
                  dimeText.innerText = `Dime: ${data.Dime}`;
                  dimeImg.style.display = 'block';
                } else {
                  dimeText.innerText = '';
                  dimeImg.style.display = 'none';
                }
      
                if(data.Nickel > 0) {
                  nickelText.innerText = `Nickel: ${data.Nickel}`;
                  nickelImg.style.display = 'block';
                } else {
                  nickelText.innerText = '';
                  nickelImg.style.display = 'none';
                }
      
                if(data.Penny > 0) {
                  pennyText.innerText = `Penny: ${data.Penny}`;
                  pennyImg.style.display = 'block';
                } else {
                  pennyText.innerText = '';
                  pennyImg.style.display = 'none';
                }
              });
            }
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

  
  

