// Define an asynchronous function to fetch data
const fetchData = async () => {
    const response = await fetch('/api/timepunches/week', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  };
  
  // Use fetchData to fetch the data and then render the chart
  fetchData()
    .then((data) => {
        console.log(data)
      const hoursWorked = [];
      for (let i = 0; i < data.length; i++) {
        const clockInTime = new Date(`1970-01-01T${data[i].clock_in}Z`);
        const clockOutTime = new Date(`1970-01-01T${data[i].clock_out}Z`);
        const timeDifferenceInMilliseconds = clockOutTime - clockInTime;
  
        // Convert milliseconds to hours
        const hoursWorkedToday = timeDifferenceInMilliseconds / (1000 * 60 * 60);
  
        hoursWorked.push(hoursWorkedToday);
      }
  
      const options = {
        chart: {
          type: 'bar'
        },
        series: [
          {
            name: 'Hours',
            data: hoursWorked
          }
        ],
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thur", "Fri"]
        }
      };
  
      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });