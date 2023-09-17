const startbtn=document.getElementById("start_workbtn");
const stopbtn=document.getElementById("stop_workbtn");
startbtn.addEventListener("click",btnswitch)
stopbtn.addEventListener("click",btnswitch)
let start=true
let count=0
function btnswitch(event){
    if(start){//things to happen when start is clicked
        startbtn.style.display="none"
        stopbtn.style.display="block"
        start=false
        count=0
        countertime.innerText="0:0:0"
        fetch('/api/timepunches/in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => console.log("Successful:", data))
        .catch((err) => console.error("Error:", err))
    }else{//things to happen when stop is clicked
        stopbtn.style.display="none"
        startbtn.style.display="block"
        start=true
        fetch('/api/timepunches/out', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => console.log("Successful:", data))
        .catch((err) => console.error("Error:", err))
    }
}

const currenttime=document.getElementById("current_time");
const currentdate=document.querySelectorAll(".date");
const months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]
const days=["1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st"]
const countertime=document.getElementById("counter");
    setInterval(()=>{
        const now=new Date();
        let hours=now.getHours();
        let AMPM="AM";
        if(hours>12){
            hours=hours-12;
            AMPM="PM";
        }else if(hours==0){
            hours=12;
        }
        const time1=`${hours}:${now.getMinutes()}:${now.getSeconds()} ${AMPM}`;
        currenttime.innerText=time1;
        const date=`${months[now.getMonth()]}, ${days[now.getDate()-1]}`;
        for(let d of currentdate){
            d.innerText=date;
        }
        if(!start){
            count++;
            const counter1=`${Math.floor(count/3600)}:${Math.floor(count/60)}:${count%60}`;
            countertime.innerText=counter1;
        }
    },1000)
