var options = {
    chart: {
        type: 'bar'
    },
    series: [{
        name: 'Hours',
        data: [4, 5, 6, 7, 4, 10, 3]
    }],
    xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();