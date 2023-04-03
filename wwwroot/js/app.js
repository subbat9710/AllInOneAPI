const API_BASE = 'https://localhost:44356/api/nasa';
let nasaData = {};
//let cardData = {};
let weatherData = {};

document.addEventListener('DOMContentLoaded', () => {
  //  document.getElementById('next_btn').addEventListener('click', getAll);

    //Subscribe form
    const popupLink = document.getElementById('subscribeLink');
    const subscribePopUp = document.getElementById('subscribe-popup');
    const popupForm = document.getElementById('popup-form');

    popupLink.addEventListener('click', (event) => {
        event.preventDefault();

        subscribePopUp.style.display = 'block';
    });

    popupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        await postSubscribeData(name, email);
        subscribePopUp.style.display = 'none';
    });

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
     const audio = new Audio('/img/coins.mp3');
      document.getElementById('change_btn').addEventListener('click', () => {
         const amount_input = document.getElementById('amount_input');
         const amount = amount_input.value;
         if (amount > 0) {
              getCoin(amount);
              audio.play();
         }
         else {
             alert('Enter a amount greater then zero')
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

    // get image data
    document.getElementById('myForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const prompt = formData.get('prompt');
        const n = formData.get('n');
        const size = formData.get('size');

        if (prompt && n && size) { 
            document.getElementById('loadingIcon').style.display = 'block';  //shows while loading
            await getImageData(prompt, n, size);
            document.getElementById('loadingIcon').style.display = 'none'; //stops when loading is done
        }
    });

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

async function getImageData(prompt, n, size) {
    n = parseInt(n, 10); //convert n to a number
    try {
      const response = await fetch('https://localhost:44356/api/nasa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          n: n,
          size: size
        })
      });
      const data = await response.json();
      displayImage(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  function displayImage(data) {
    const imgContainer = document.getElementById('imageContainer');
    imgContainer.innerHTML = ''; // clear any previous image(s)
    data.data.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.url;
      imgContainer.appendChild(img);
    });
}

async function postSubscribeData(name, email) {
    try {
      const response = await fetch('https://localhost:44356/api/nasa/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email
        })
    });
  
    console.log(response);
  
    const responseData = await response.json();
  
    console.log(responseData);
  
    if (Number(responseData.id) === 0) {
        alert("Email already exists!Enter different Email!");
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    } else if (response.ok) {
        // Clear input fields
        alert("You're successfully subscribed!");
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
  
        // Hide popup form
        subscribePopUp.style.display = 'none';
       }
    } catch (error) {
      console.error(error);
    }
}  

