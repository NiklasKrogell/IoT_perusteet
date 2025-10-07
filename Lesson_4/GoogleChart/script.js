google.charts.load('current', {'packages':['corechart']});

function amountOfDataPoints() {
    const input = document.getElementById("dataPoints").value;
    let url = "https://api.thingspeak.com/channels/3082545/feeds.json?api_key=HO52B2RTP6SUZ99S";

    if (input && Number(input) > 0) {
        url += `&results=${input}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            google.charts.setOnLoadCallback(() => drawChart(data.feeds));
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
}


function drawChart(feeds) {
    const parsedData = [['Time', 'Temperature', 'Humidity']];
    feeds.forEach(feed => {
        const time = new Date(feed.created_at);
        const temp = parseFloat(feed.field1);
        const humidity = parseFloat(feed.field2);

        if (!isNaN(temp) && !isNaN(humidity)) {
            parsedData.push([time, temp, humidity]);
        }
    });

    const data = google.visualization.arrayToDataTable(parsedData);

    const options = {
        title: 'Temperature and Humidity',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

