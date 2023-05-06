let FlightData =[]

let FlightLS = JSON.parse(localStorage.getItem("flight")) || []

window.addEventListener("load",()=>{
    fetchAndRenderHotels(1)
})

let mainDiv = document.getElementById("data-list-wrapper")


function fetchAndRenderHotels(){
    fetch(`https://api-by-alisha-khan.onrender.com/flights`)
    .then(res =>{
        // let totalPosts = res.headers.get("X-Total-Count")
        // let totalBtn = Math.ceil(totalPosts/10)
        // paginationWapper.innerHTML = null;
        // for(let i=1;i<=totalBtn;i++){
        //     paginationWapper.append(getAsBtn(i,i))
        // }
        return res.json();
    })
    .then(data =>{
        console.log(data);
        FlightData = data;
       showData(FlightData);
    })
    .catch(err => {console.log(err)})
}


function showData(data){
    mainDiv.innerHTML = ""
    let cardList = getCardList(data);
    mainDiv.append(cardList);
}

function getCardList(data){
    let cardList = document.createElement("div");
    cardList.className = "card-list"

    data.forEach((item)=>{
        let card = getCard(item.flight_number,item.airline,item.price,item.image,item.from_city,item.to_city,item.arrival,item.departure,item.layovers,item.duration)
       
        cardList.append(card);
    })
    return cardList;
}

function getCard(flightNumber,airline,price,image,fromCity,toCity,arrival,departure,layovers,duration){
    let card = document.createElement("div");
    card.className = "card"
    // ---------------------------------------------------
    let imgDiv = document.createElement("div")
    imgDiv.className = "img-body"

    let img = document.createElement("img")
    img.className = "flight-img"
    img.src = image
    img.setAttribute("alt",airline)

    let airlineNameNumber = document.createElement("p")
    airlineNameNumber.innerText = `${flightNumber} | ${airline}`

    imgDiv.append(img,airlineNameNumber)

    // --------------------------Card-Body-Starts-------------------------

    let cardBody = document.createElement("div")
    cardBody.className = "card-body"
    
    // -------------------DepartDiv--------------------------------

    let departDiv = document.createElement("div")
    departDiv.className = "depart-div"

    let departureTime = document.createElement("h3")
    departureTime.innerText = departure
    
    let depCity = document.createElement("p")
    depCity.innerText = `${fromCity} `
    
    //  let date =document.createElement("p")   ------------------------> add date here

    departDiv.append(departureTime,depCity)

    // -----------------------DurationDiv----------------------------
    let durationDiv = document.createElement("div")
    durationDiv.className = "duration-div"
    

    let filghtDuration = document.createElement("p")
    filghtDuration.innerText = `${duration}`

    let lineDiv = document.createElement("div")
        lineDiv.className = "line-div";

    let totstops = document.createElement("p")
        totstops.className = "total-stops"

        if(layovers.length == 0){
            totstops.innerText = "Direct"
        }
        else{   
                                        //   -----------------------------> check totstop layovers
            totstops.innerText = `1 Stop | ${layovers[0]}`  
        }

    durationDiv.append(filghtDuration,lineDiv,totstops) 
    
    // -------------------ArrivalDiv--------------------------------

    let arrivalDiv = document.createElement("div")
    arrivalDiv.className = "arrive-div"

        
    let arrivalTime = document.createElement("h3")
    arrivalTime.innerText = arrival
    
    let arrivalCity = document.createElement("p")
    arrivalCity.innerText = `${toCity} `
    
    //  let date =document.createElement("p")   ------------------------> add date here

    arrivalDiv.append(arrivalTime,depCity)

//------------------------------------------------------
  cardBody.append(departDiv,durationDiv,arrivalDiv)

//-------------------------Card-Body-Ends---------------------

//------------------------Button Div------------------------

let buttonDiv = document.createElement("div")
        buttonDiv.className = "btn-div"

        let flightPrice = document.createElement("p")
        flightPrice.className = "flight-price"
        flightPrice.innerText = `₹ ${price}  `

        let bookbtn = document.createElement("button")
        bookbtn.className = "fight-book"
        bookbtn.innerText = "Book"

        bookbtn.addEventListener("click",()=>{
                                        //---------------------------------> add flightLS here
            // FlightLS = ({})
            // localStorage.setItem("flight",JSON.stringify(FlightLS));
                                        //---------------------------------> add payment location here
            // window.location.href =""
        })

        buttonDiv.append(flightPrice,bookbtn)



        card.append(imgDiv,cardBody,buttonDiv)
        return card
}