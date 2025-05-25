if (!window.fiumeWeatherLoaded) {
  window.fiumeWeatherLoaded = true;

  const apiKey = '9e53044f11c6a5542da645889265a098';
  const city = 'Stockholm';

  const iconMap = {
    Clear:    { d: 'wi-day-sunny',        n: 'wi-night-clear' },
    Clouds:   { d: 'wi-day-cloudy',       n: 'wi-night-alt-cloudy' },
    Rain:     { d: 'wi-day-rain',         n: 'wi-night-alt-rain' },
    Drizzle:  { d: 'wi-day-sprinkle',     n: 'wi-night-alt-sprinkle' },
    Thunderstorm: { d: 'wi-day-thunderstorm', n: 'wi-night-alt-thunderstorm' },
    Snow:     { d: 'wi-day-snow',         n: 'wi-night-alt-snow' },
    Mist:     { d: 'wi-day-fog',          n: 'wi-night-fog' },
    Fog:      { d: 'wi-day-fog',          n: 'wi-night-fog' },
    Smoke:    { d: 'wi-smoke',            n: 'wi-smoke' },
    Haze:     { d: 'wi-day-haze',         n: 'wi-night-fog' },
    Dust:     { d: 'wi-dust',             n: 'wi-dust' },
    Sand:     { d: 'wi-sandstorm',        n: 'wi-sandstorm' },
    Ash:      { d: 'wi-volcano',          n: 'wi-volcano' },
    Squall:   { d: 'wi-strong-wind',      n: 'wi-strong-wind' },
    Tornado:  { d: 'wi-tornado',          n: 'wi-tornado' },
  };

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`
      );
      const data = await response.json();

      if (!data.main || !data.weather || !data.sys) {
        console.error("❌ Felaktigt API-svar:", data);
        return;
      }

      const temp = Math.round(data.main.temp);
      const weatherMain = data.weather[0].main;
      const description = data.weather[0].description;

      // Hämta solens tider (sekunder → ms)
      const sunrise = data.sys.sunrise * 1000;
      const sunset = data.sys.sunset * 1000;
      const now = Date.now();

      const isNight = now < sunrise || now > sunset;
      const timeOfDay = isNight ? 'n' : 'd';

      console.log("🕐 Tid nu:", new Date(now).toLocaleTimeString());
      console.log("🌅 Soluppgång:", new Date(sunrise).toLocaleTimeString());
      console.log("🌇 Solnedgång:", new Date(sunset).toLocaleTimeString());
      console.log("🌙 Nattläge?", isNight);

      let iconClass = 'wi-na'; // fallback

      if (iconMap[weatherMain] && iconMap[weatherMain][timeOfDay]) {
        iconClass = iconMap[weatherMain][timeOfDay];
      } else {
        console.warn("⚠️ Okänt väderläge:", weatherMain);
      }

      const tempEl = document.getElementById('weather-temp');
      const iconEl = document.getElementById('weather-icon');

      if (tempEl) tempEl.textContent = `${temp}°C`;
      if (iconEl) {
        iconEl.className = `wi ${iconClass} text-xl text-white`;
        iconEl.setAttribute('aria-label', description || 'Väder');
      }

      const cache = {
        temp: `${temp}°C`,
        iconClass,
        description,
        timestamp: Date.now()
      };
      localStorage.setItem('fiumeWeatherCache', JSON.stringify(cache));

    } catch (error) {
      console.error('🚫 Kunde inte hämta väderdata:', error);
    }
  }

  const cacheRaw = localStorage.getItem('fiumeWeatherCache');
  const tempEl = document.getElementById('weather-temp');
  const iconEl = document.getElementById('weather-icon');

  if (cacheRaw) {
    const cache = JSON.parse(cacheRaw);
    const now = Date.now();

    if (now - cache.timestamp < 3600000) {
      if (tempEl) tempEl.textContent = cache.temp;
      if (iconEl) {
        iconEl.className = `wi ${cache.iconClass} text-xl text-white`;
        iconEl.setAttribute('aria-label', cache.description || 'Väder');
      }
      console.log("📦 Väder laddat från cache");
    } else {
      console.log("♻️ Cache för gammal, hämtar nytt...");
      fetchWeather();
    }
  } else {
    console.log("🔍 Ingen cache hittad, hämtar väder...");
    fetchWeather();
  }
}
