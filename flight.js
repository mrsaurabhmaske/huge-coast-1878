let userName = localStorage.getItem("userName") || "x";
    console.log(userName);
   
    if(userName=="x"){
        window.location.href = "login-signup.html";
        alert("Please login First!!!");
}
    
//<<<<<<<<<<<<<<<<<<<<<<User Login Validation>>>>>>>>>>>>>>>>>>>>>>


let today = new Date();
today.setDate(new Date().getDate());
let todayISO = today.toISOString().substr(0, 10);

// Set the default value of the date input field to today's date
document.getElementById("dep_date").defaultValue = todayISO;
// -----------------------------------------------------------------

let FlightData =[]

let FlightLS = JSON.parse(localStorage.getItem("flight")) || []

window.addEventListener("load",()=>{
    fetchAndRenderFlights(1)
})

let mainDiv = document.getElementById("data-list-wrapper")


function fetchAndRenderFlights(){
    fetch(`https://api-by-alisha-khan.onrender.com/flights`)
    .then(res =>{
        return res.json();
    })
    .then(data =>{
        console.log(data);
        FlightData = data;
       showData(FlightData);
    })
    .catch(err => {console.log(err)})
}

function showData(data) {
    mainDiv.innerHTML = null;

    let cardlist = document.createElement("div");
    cardlist.className = "cardlist";

    data.forEach(element => {
        let card = document.createElement("div");
        card.className = "card";

        let imageSection = document.createElement("div");
        imageSection.className = "imageSection";
        let flightNum = document.createElement("div");
        flightNum.className = "flightNum";
        flightNum.innerText = element.flight_number;
        let airline = document.createElement("div");
        airline.className = "airline";
        airline.innerText = element.airline;
        imageSection.append(flightNum,  airline)

        let infoSection     = document.createElement("div");
        infoSection.className="infoSection";

        let upper = document.createElement("div");
        upper.className = "infoUpper";
        let dDiv            = document.createElement("div");
        dDiv.className      = "cityDiv";
        dDiv.innerText      = `${element.from_city} (${element.from_code})`;
        let aDiv            = document.createElement("div");
        aDiv.className      = "cityDiv";
        aDiv.innerText      = `${element.to_city} (${element.to_code})`;

        let midDiv          = document.createElement("div");
        midDiv.className    = "midDiv";

        let midTop          = document.createElement("div");
        midTop.className    = "midTop";
        midTop.innerText    = `${element.duration}`;
        let midBottom       = document.createElement("div");
        midBottom.className = "midBottom";
        midBottom.innerText = `${element.departure} - ${element.arrival}`;

        midDiv.append(midTop,midBottom);

        upper.append(dDiv,midDiv,aDiv);

        let lower = document.createElement("div");
        lower.className = "infoLower";

        let priceDiv = document.createElement("div");
        priceDiv.className="priceDiv";
        priceDiv.innerText = `Price: ₹ ${element.price}`;
        let seatsDiv = document.createElement("div");
        seatsDiv.className = "seatsDiv";
        seatsDiv.innerText = `Seats: ${element.seats_available}`;

        lower.append(priceDiv,seatsDiv)

        infoSection.append(upper,lower);
        
        let buttonSection   = document.createElement("div");
        buttonSection.className = "buttonSection";

       
        let bookbtn = document.createElement("div")
        bookbtn.className = "editBtn cardButton"
        bookbtn.innerText = "Book"

        buttonSection.append(bookbtn);

        bookbtn.addEventListener("click",()=>{
                                                    //---------------------------------> add flightLS here
            let depDate = document.getElementById("dep_date").value
            let arrDate = document.getElementById("ret_date").value
            console.log(depDate,arrDate);
                        FlightLS = []
                        FlightLS = ({name : element.airline,
                                    price : element.price,
                                    fromCity : element.from_city,
                                    fromCode : element.from_code,
                                    toCity : element.to_city,
                                    toCode : element.to_code,
                                    arrival : element.arrival,
                                    departure : element.departure,
                                    duration : element.duration,
                                    flightNumber : element.flight_number,
                                    depDate : depDate,
                                    arrDate : arrDate
                                 })
                        localStorage.setItem("flight",JSON.stringify(FlightLS));
                                                    //---------------------------------> add payment location here
                        // window.location.href =""
                    })

        card.append(imageSection, infoSection, buttonSection);
        cardlist.append(card);
    });
    mainDiv.append(cardlist);
}

//------------------------------------Functionality------------------------------------------

let directCheckbox = document.querySelector("#direct")
let oneStopCheckbox = document.querySelector("#onestop")
let twostopCheckbox = document.querySelector("#twostop")

directCheckbox.addEventListener("change",()=>{filterCheck()})
oneStopCheckbox.addEventListener("change",()=>{filterCheck()})
twostopCheckbox.addEventListener("change",()=>{filterCheck()})

let airIndiaCheckbox = document.querySelector("#air_india");
let spiceJetCheckbox = document.querySelector("#spice_jet");
let indiGoCheckbox = document.querySelector("#indi_go");
let vistaraCheckbox = document.querySelector("#vistara");
let goAirCheckbox = document.querySelector("#go_air");

airIndiaCheckbox.addEventListener("change",()=>{filterCheck()})
spiceJetCheckbox.addEventListener("change",()=>{filterCheck()})
indiGoCheckbox.addEventListener("change",()=>{filterCheck()})
vistaraCheckbox.addEventListener("change",()=>{filterCheck()})
goAirCheckbox.addEventListener("change",()=>{filterCheck()})



function filterCheck(){
    console.log("filterData");
     let filterData = FlightData.filter((ele)=>{
        if((directCheckbox.checked && ele.layovers.length ==0) || (oneStopCheckbox.checked && ele.layovers.length ==1) || (twostopCheckbox.checked && ele.layovers.length ==2) ){
            console.log(ele.id);
            return true;
        }
        if (airIndiaCheckbox.checked && ele.airline == 'Air India' || spiceJetCheckbox.checked && ele.airline == 'SpiceJet' || indiGoCheckbox.checked && ele.airline =="IndiGo" || vistaraCheckbox.checked && ele.airline =="Vistara" || goAirCheckbox.checked && ele.airline =="GoAir") {
            console.log(ele.id)
            return true;
          }
        
        //   if (ResortsCheckbox.checked && ele.category === 'Resort') {
        //     console.log(ele.id)
        //     return true;
        //   }
          return false;
    });

    if (!airIndiaCheckbox.checked && !spiceJetCheckbox.checked && !indiGoCheckbox.checked && !vistaraCheckbox.checked && !goAirCheckbox.checked && !twostopCheckbox.checked && !oneStopCheckbox.checked &&
        !directCheckbox.checked) {
            fetchAndRenderFlights()
      } else {
         showData(filterData); 

      }
   
   }



   let  searchFrom = document.querySelector(".searchContainer_input_from");
   let searchTo = document.querySelector(".searchContainer_input_to");

   let Searchbtn = document.querySelector(".searchbtn")

   Searchbtn.addEventListener("click",()=>{
    let filter ;
    if(searchFrom == null && searchTo == null){
        fetchAndRenderFlights()
    }
    else{
        filter = FlightData.filter((ele)=>{
            if(ele.from_city.toUpperCase().includes(searchFrom.value.toUpperCase()) || ele.from_code.toUpperCase().includes(searchFrom.value.toUpperCase())){
                return true
            }
            if(ele.to_city.toUpperCase().includes(searchTo.value.toUpperCase()) || ele.to_code.toUpperCase().includes(searchTo.value.toUpperCase())){
                return true
            }
            else{
                return false
            }
        })
        console.log(filter)
        showData(filter);
    }
   })

    
let userLogOut = document.querySelector("#logOutButton");
    
userLogOut.addEventListener("click",function(){
    localStorage.removeItem("userName");
    localStorage.removeItem("userPass");
    window.location.href = "login-signup.html";
})
   
