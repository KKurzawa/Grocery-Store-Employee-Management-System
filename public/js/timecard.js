var options = {
    chart: {
        type: 'bar'
    },
    series: [{
        name: 'Hours',
        data: [5, 6, 7, 4, 10]
    }],
    xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thur", "Fri"]
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();