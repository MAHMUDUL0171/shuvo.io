document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.home-link');
    const categoryLinks = document.querySelectorAll('.category-link');
    const regionsSection = document.getElementById('regions');
    const heroSection = document.getElementById('hero');
    const regionContainer = document.querySelector('.region-container');
    const regionTitle = document.getElementById('region-title');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const localTimeDisplay = document.getElementById('local-time');

    // Define prefectures for each region
    const prefectures = {
        "Hokkaido": ["Hokkaido"],
        "Tohoku": ["Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima"],
        "Kanto": ["Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa"],
        "Chubu": ["Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi"],
        "Kansai": ["Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama"],
        "Chugoku": ["Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi"],
        "Shikoku": ["Tokushima", "Kagawa", "Ehime", "Kochi"],
        "Kyushu": ["Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa"]
    };

    // Define sample Halal restaurants for each prefecture (replace with your actual data)
    const halalRestaurants = {
        "Hokkaido": [
            { name: "Restaurant A", address: "Sapporo, Hokkaido" },
            { name: "Restaurant B", address: "Otaru, Hokkaido" },
        ],
        "Tohoku": [
            { name: "Restaurant C", address: "Sendai, Miyagi" },
        ],
        // ... Add entries for other prefectures
    };

    // Define sample famous places for each prefecture (replace with your actual data)
    const famousPlaces = {
        "Hokkaido": [
            { name: "Mount Hakodate", address: "Hakodate, Hokkaido" },
            { name: "Noboribetsu Onsen", address: "Noboribetsu, Hokkaido" },
        ],
        "Tohoku": [
            { name: "Lake Towada", address: "Aomori, Tohoku" },
            { name: "Zao Onsen", address: "Yamagata, Tohoku" },
        ],
        // ... Add entries for other prefectures
    };

    // Define sample mosque locations for each prefecture (replace with your actual data)
    const mosqueLocations = {
        "Hokkaido": [
            { name: "Sapporo Mosque", address: "Sapporo, Hokkaido" },
            { name: "Asahikawa Mosque", address: "Asahikawa, Hokkaido" },
        ],
        "Tohoku": [
            { name: "Sendai Mosque", address: "Sendai, Miyagi" },
        ],
        // ... Add entries for other prefectures
    };

    // Define sample graveyard locations for each prefecture (replace with your actual data)
    const graveyardLocations = {
        "Hokkaido": [
            { name: "Sapporo Muslim Cemetery", address: "Sapporo, Hokkaido", contactPerson: "Yamada Taro", contactNumber: "080-1234-5678" },
            { name: "Hakodate Islamic Burial Ground", address: "Hakodate, Hokkaido", contactPerson: "Suzuki Hanako", contactNumber: "090-9876-5432" },
        ],
        "Tohoku": [
            { name: "Sendai Muslim Graveyard", address: "Sendai, Miyagi", contactPerson: "Sato Ichiro", contactNumber: "070-2468-1357" },
        ],
        // ... Add entries for other prefectures
    };

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState({ section: 'home' }, '', '#home');
        displayHome();
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            history.pushState({ section: 'category', category: category }, '', `#category-${category}`);
            displayRegions(category);
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            if (event.state.section === 'home') {
                displayHome();
            } else if (event.state.section === 'category') {
                displayRegions(event.state.category);
            }
        }
    });

    function displayHome() {
        heroSection.style.display = 'block';
        regionsSection.style.display = 'none';
    }

    function displayRegions(category) {
        regionTitle.textContent = `Regions for ${capitalizeFirstLetter(category)}`;
        regionContainer.innerHTML = '';
        Object.keys(prefectures).forEach(region => {
            const regionCard = document.createElement('div');
            regionCard.classList.add('region-card');
            regionCard.textContent = region;
            regionCard.addEventListener('click', () => {
                displayPrefectures(prefectures[region], region, category);
            });
            regionContainer.appendChild(regionCard);
        });
        heroSection.style.display = 'none';
        regionsSection.style.display = 'block';
    }

    function displayPrefectures(prefecturesArray, region, category) {
        regionContainer.innerHTML = ''; // Clear previous content
        prefecturesArray.forEach(prefecture => {
            const prefectureCard = document.createElement('div');
            prefectureCard.classList.add('prefecture-card');
            prefectureCard.textContent = prefecture;

            // Create container for content based on category
            const prefectureContent = document.createElement('div');
            prefectureContent.classList.add('prefecture-content');

            if (category === 'restaurants') {
                // Create list element for Halal restaurants
                const restaurantList = document.createElement('ul');
                restaurantList.classList.add('restaurant-list');

                // Add sample Halal restaurants from the data object
                halalRestaurants[prefecture]?.forEach(restaurant => {
                    const listItem = document.createElement('li');
                    listItem.textContent = restaurant.name;
                    restaurantList.appendChild(listItem);
                });

                // Create Google Maps link for Halal restaurants in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=Halal+restaurants+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(restaurantList);
                prefectureContent.appendChild(googleMapsLink);
            } else if (category === 'grocery-stores') {
                // Create Google Maps link for Halal grocery stores in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=Halal+grocery+stores+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(googleMapsLink);
            } else if (category === 'travel-guides') {
                // Create list element for famous places
                const placesList = document.createElement('ul');
                placesList.classList.add('places-list');

                // Add sample famous places from the data object
                famousPlaces[prefecture]?.forEach(place => {
                    const listItem = document.createElement('li');
                    listItem.textContent = place.name;
                    placesList.appendChild(listItem);
                });

                // Create Google Maps link for famous places in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=famous+places+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(placesList);
                prefectureContent.appendChild(googleMapsLink);
            } else if (category === 'prayer-facilities') {
                // Create list element for mosque locations
                const mosqueList = document.createElement('ul');
                mosqueList.classList.add('mosque-list');

                // Add sample mosque locations from the data object
                mosqueLocations[prefecture]?.forEach(mosque => {
                    const listItem = document.createElement('li');
                    listItem.textContent = mosque.name;
                    mosqueList.appendChild(listItem);
                });

                // Create Google Maps link for mosque locations in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=mosque+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(mosqueList);
                prefectureContent.appendChild(googleMapsLink);
            } else if (category === 'recycle-shops') {
                // Create Google Maps link for Recycle Shops in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=Recycle+Shops+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(googleMapsLink);
            } else if (category === 'graveyards') {
                // Create list element for graveyard locations
                const graveyardList = document.createElement('ul');
                graveyardList.classList.add('graveyard-list');

                // Add sample graveyard locations from the data object
                graveyardLocations[prefecture]?.forEach(graveyard => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${graveyard.name}</strong><br>
                        Address: ${graveyard.address}<br>
                        Contact Person: ${graveyard.contactPerson}<br>
                        Contact Number: ${graveyard.contactNumber}
                    `;
                    graveyardList.appendChild(listItem);
                });

                // Create Google Maps link for graveyard locations in the prefecture
                const googleMapsLink = document.createElement('a');
                googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=muslim+graveyard+in+${encodeURIComponent(prefecture)}`;
                googleMapsLink.textContent = 'View on Google Maps';
                googleMapsLink.target = '_blank';

                prefectureContent.appendChild(graveyardList);
                prefectureContent.appendChild(googleMapsLink);
            }

            prefectureCard.appendChild(prefectureContent);
            regionContainer.appendChild(prefectureCard);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            const results = searchAllCategories(query);
            displaySearchResults(results);
            
            // Perform Google search
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:halaljapanguide.com`;
            window.open(googleSearchUrl, '_blank');
        }
    }

    function searchAllCategories(query) {
        query = query.toLowerCase();
        const results = [];

        // Search restaurants
        Object.values(halalRestaurants).flat().forEach(restaurant => {
            if (restaurant.name.toLowerCase().includes(query) || restaurant.address.toLowerCase().includes(query)) {
                results.push({ type: 'Restaurant', ...restaurant });
            }
        });

        // Search famous places
        Object.values(famousPlaces).flat().forEach(place => {
            if (place.name.toLowerCase().includes(query) || place.address.toLowerCase().includes(query)) {
                results.push({ type: 'Famous Place', ...place });
            }
        });

        // Search mosques
        Object.values(mosqueLocations).flat().forEach(mosque => {
            if (mosque.name.toLowerCase().includes(query) || mosque.address.toLowerCase().includes(query)) {
                results.push({ type: 'Mosque', ...mosque });
            }
        });

        // Search graveyards
        Object.values(graveyardLocations).flat().forEach(graveyard => {
            if (graveyard.name.toLowerCase().includes(query) || graveyard.address.toLowerCase().includes(query)) {
                results.push({ type: 'Graveyard', ...graveyard });
            }
        });

        return results;
    }

    function displaySearchResults(results) {
        heroSection.style.display = 'none';
        regionsSection.style.display = 'block';
        regionTitle.textContent = 'Search Results';
        regionContainer.innerHTML = '';

        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.textContent = 'No results found.';
            regionContainer.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('result-card');
                resultCard.innerHTML = `
                    <h3>${result.name}</h3>
                    <p>Type: ${result.type}</p>
                    <p>Address: ${result.address}</p>
                    ${result.contactPerson ? `<p>Contact: ${result.contactPerson}</p>` : ''}
                    ${result.contactNumber ? `<p>Phone: ${result.contactNumber}</p>` : ''}
                `;
                regionContainer.appendChild(resultCard);
            });
        }
    }

    function updateTime() {
        const now = moment();
        const localTime = now.format('h:mm:ss A');
        localTimeDisplay.textContent = `Local Time: ${localTime}`;
    }

    function fetchPrayerTimes() {
        const now = moment();
        const dateString = now.format('YYYY-MM-DD');

        axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
            params: {
                city: 'Tokyo',
                country: 'Japan',
                method: 2,
                date: dateString
            }
        })
        .then(response => {
            const prayerTimes = response.data.data.timings;
            updatePrayerTimes(prayerTimes);
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
    }

    function updatePrayerTimes(prayerTimes) {
        document.getElementById('fajr').textContent = `Fajr ${prayerTimes.Fajr}`;
        document.getElementById('sunrise').textContent = `Sunrise ${prayerTimes.Sunrise}`;
        document.getElementById('dhuhr').textContent = `Dhuhr ${prayerTimes.Dhuhr}`;
        document.getElementById('asr').textContent = `Asr ${prayerTimes.Asr}`;
        document.getElementById('magrib').textContent = `Magrib ${prayerTimes.Maghrib}`;
        document.getElementById('isha').textContent = `Isha ${prayerTimes.Isha}`;
    }

    setInterval(updateTime, 1000);
    fetchPrayerTimes();
    
    // Refresh prayer times every hour
    setInterval(fetchPrayerTimes, 3600000);
});