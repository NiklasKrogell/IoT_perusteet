const url = "https://api.thingspeak.com/channels/3082545/feeds.json?api_key=HO52B2RTP6SUZ99S"

fetch(url)
    .then(response => response.json())
    .then(data => {
        const feeds = data.feeds;

        const temperatures = feeds.map(feed =>({
            time: feed.created_at,
            temperature: parseFloat(feed.field1)
        }));
        document.getElementById("output").textContent = JSON.stringify(temperatures);
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
        document.getElementById("output").textContent = "Error loading data";
    })