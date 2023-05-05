//  -----------------------------date------------------------------------ --

// Get tomorrow's date
let tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
let tomorrowISO = tomorrow.toISOString().substr(0, 10);

// Set the default value of the date input field to tomorrow's date
document.getElementById("tom_date").defaultValue = tomorrowISO;

//Get today's date
let today = new Date();
today.setDate(new Date().getDate());
let todayISO = today.toISOString().substr(0, 10);

// Set the default value of the date input field to today's date
document.getElementById("tod_date").defaultValue = todayISO;

//  -----------------------------date end------------------------------------ --

//  -----------------------------Card Container------------------------------------ --

let HotelData =[]

window.addEventListener("load",()=>{
    fetchAndRenderHotels(1)
})

let mainDiv = document.getElementById("data-list-wrapper")
let paginationWapper = document.getElementById("pagination-wrapper")

function fetchAndRenderHotels(){
    fetch(`https://api-by-alisha-khan.onrender.com/hotels`)
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
        HotelData = data;
       showData(HotelData);
    })
    .catch(err => {console.log(err)})
}

    //  -----------------------------Show Data Function------------------------------------ --

        function showData(data){
            mainDiv.innerHTML = null;
        
            let cardList = getCardList(data);
            mainDiv.append(cardList);
        }

        // function pagination(data){
        //     console.log(data.length)
           
        //     let totalPosts = data.length;
        //     let totalBtn = Math.ceil(totalPosts/10)
        //     paginationWapper.innerHTML = null;
        //     for(let i=1;i<=totalBtn;i++){
        //         paginationWapper.append(getAsBtn(i,i))
        //     }
        //     showData(data)
        // }

      
    //  -----------------------------Button Data------------------------------------ --

// function getAsBtn(text,dataId){
//     let btn = document.createElement("button");
//     btn.innerHTML = text;
//     btn.setAttribute("data-id",dataId);
//     btn.addEventListener("click",(e)=>{
//         console.log(e.target.dataset.id)
//         fetchAndRenderHotels(e.target.dataset.id);
//     });
//     return btn;
// }
    //  -----------------------------Card List Data------------------------------------ --

function getCardList(data){
    let cardList = document.createElement("div");
    cardList.className = "card-list"

    data.forEach((item)=>{
        let card = getCard(item.name,item.location,item.price,item.image,item.rating,item.id)
        let cardDetails = getCardDetails(item.description)
        cardList.append(card,cardDetails);
    })
    return cardList;
}
    //  -----------------------------Card Data------------------------------------ --

function getCard(name,loc,price,image,rating,id){
    let card = document.createElement("div");
    card.className = "card"
    card.setAttribute("data-id",id);

    let imgDiv = document.createElement("div")
    imgDiv.className = "card_img";

    let img = document.createElement("img");
    img.src = image;
    img.setAttribute("alt",`${name} image`);

    imgDiv.append(img);

    let cardBody = document.createElement("div");
    cardBody.className ="card_body";

    let h3 = document.createElement("h3");
    h3.className = "card_title"
    h3.innerText = name;

    let location = document.createElement("span");
    location.className = "card_location";
    location.innerText = loc;

    let ratingDiv = document.createElement("div")
    ratingDiv.className = "ratingDiv"

    let stars = document.createElement("h4");
    stars.classList = "rating_stars"
    stars.innerText = `${rating} ★`;
    
    let totRating = document.createElement("span")
    totRating.className = "total_rating"
    totRating.innerText = `(${Math.floor(100 + Math.random() * 2000)} Ratings)`

    ratingDiv.append(stars,totRating);

    let totprice = document.createElement("h3")
    totprice.className = "price"
    totprice.innerText = `₹ ${price}  `

    let btns = document.createElement("div")
    btns.className ="card_btns"

    let viewbtn = document.createElement("button")
    viewbtn.className = "view_details"
    viewbtn.innerText = "View Details"

    viewbtn.addEventListener("click",()=>{
        if(viewbtn.innerText == "View Details"){
            viewbtn.innerText = "Hide Details";
// -------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
            let cardDetails = document.getElementsByClassName("card-details")
            cardDetails.style.display = "flex";
// =================================================================================================
        }
        else{
            viewbtn.innerText = "View Details"
        }
    })

    let bookbtn = document.createElement("button")
    bookbtn.className = "book_btn"
    bookbtn.textContent = "Book Now"

    btns.append(viewbtn,bookbtn)

cardBody.append(h3,location,ratingDiv,totprice,btns);
card.append(imgDiv,cardBody);
return card;
}

function getCardDetails(des){
    let cardDetails = document.createElement("div");
    cardDetails.className = "card-details"
    
    let description = document.createElement("span")
    description.className = "card_description"
    description.innerHTML = `<strong>Description</strong> <br> ${des}` 

    let amenities = document.createElement("div")
    amenities.className = "amenities";
    let ac = document.createElement("p")
    ac.innerText = "Air Conditioner"
    let tv = document.createElement("p")
    tv.innerText = "Televison"
    let freeWifi = document.createElement("p");
    freeWifi.innerText = "Free Wifi";
    let kingbed = document.createElement("p")
    kingbed.innerText = "King Sized Bed";
    let parking = document.createElement("p")
    parking.innerText = "Parking facility";

    amenities.append(ac,tv,freeWifi,kingbed,parking)

    cardDetails.append(description,amenities);
    return cardDetails;
}




//  ----------------------------------Filter Functionality------------------------------------ --

    //  ----------------------------------Sort Data------------------------------------ --

    let FiltersortAtoZ = document.getElementById("sort");
    FiltersortAtoZ.addEventListener("change",()=>{
        if(FiltersortAtoZ.value == ""){
            // showData(HotelData)
            fetchAndRenderHotels(1);
        }
        else if(FiltersortAtoZ.value == "rating"){
                let filterData = HotelData.sort((a,b)=>{
                    return a.rating - b.rating;
                })
                console.log(filterData)
                showData(filterData);
        }

        else if(FiltersortAtoZ.value == "price_lowtoHigh"){
            let filterData = HotelData.sort((a,b)=>{
                return a.price - b.price;
            })
            console.log(filterData)
            showData(filterData);
        }

        else if(FiltersortAtoZ.value == "price_hightoLow"){
            let filterData = HotelData.sort((a,b)=>{
                return b.price - a.price;
            })
            console.log(filterData)
             showData(filterData);   
            //pagination(filterData)
        }
    })

    //  ----------------------------------Filter Data------------------------------------ --
       
    //  ---------------------Filter Accomodation------------------ --
    let villasCheckbox = document.getElementById("Vilas");
    let HotelsCheckbox = document.getElementById("Hotel");
    let ResortsCheckbox = document.getElementById("Resort");
    let HomestaysCheckbox = document.getElementById("Homestay");

    
    villasCheckbox.addEventListener("change",()=>{filterCheck()});
    HomestaysCheckbox.addEventListener("change",()=>{filterCheck()});
    ResortsCheckbox.addEventListener("change",()=>{filterCheck()});
    HomestaysCheckbox.addEventListener("change",()=>{filterCheck()})

    //  ---------------------Filter category------------------ --
    let classicChecked = document.getElementById("classic");
    let premiumChecked = document.getElementById("premium");
    let luxuryChecked = document.getElementById("luxury");

    classicChecked.addEventListener("change",()=>{filterCheck()});
    premiumChecked.addEventListener("change",()=>{filterCheck()});
    luxuryChecked.addEventListener("change",()=>{filterCheck()});
    
    //  ---------------------Filter Rating------------------ --
    let fivestarChecked = document.getElementById("rating-5");
    let fourstarChecked = document.getElementById("rating-4");
    let threestarChecked = document.getElementById("rating-3");
    let twostarChecked = document.getElementById("rating-2");
    let onestarChecked = document.getElementById("rating-1");

    fivestarChecked.addEventListener("change",()=>{filterCheck()});
    fourstarChecked.addEventListener("change",()=>{filterCheck()});
    threestarChecked.addEventListener("change",()=>{filterCheck()});
    twostarChecked.addEventListener("change",()=>{filterCheck()});
    onestarChecked.addEventListener("change",()=>{filterCheck()});

    //  ---------------------Filter Price------------------ --

   let priceFilter = document.getElementById("priceRange")
   priceFilter.addEventListener("change",()=>{filterCheck()});


   function filterCheck(){
    console.log("filterAccomodation");
     let filterData = HotelData.filter((ele)=>{
        if((villasCheckbox.checked && ele.category === 'Vilas') || (HotelsCheckbox.checked && ele.category === 'Hotel') || (HomestaysCheckbox.checked && ele.category === 'Homestay') ||(ResortsCheckbox.checked && ele.category === "Resort")){
            console.log(ele.id);
            return true;
        }
        if (classicChecked.checked && ele.price <= 5000 || premiumChecked.checked && (ele.price > 5000 && ele.price <= 10000 ) || luxuryChecked.checked && ele.price > 10000 ) {
            console.log(ele.id)
            return true;
          }
          if (fivestarChecked.checked && ele.rating >= 5 || fourstarChecked.checked && (ele.rating >= 4 && ele.rating < 5) || threestarChecked.checked && (ele.rating >= 3 && ele.rating < 4) || twostarChecked.checked && (ele.rating >= 2 && ele.rating < 3) || onestarChecked.checked && (ele.rating >= 1 && ele.rating < 2) ) {
            console.log(ele.id)
            return true;
            
          }
        //   if (HomestaysCheckbox.checked && ele.category === 'Homestay') {
        //     console.log(ele.id)
        //     return true;
        //   }
        //   if (ResortsCheckbox.checked && ele.category === 'Resort') {
        //     console.log(ele.id)
        //     return true;
        //   }
          return false;
    });

    if (!villasCheckbox.checked && !HotelsCheckbox.checked && !HomestaysCheckbox.checked && !ResortsCheckbox.checked && !classicChecked.checked && !premiumChecked.checked && !luxuryChecked.checked &&
        !fivestarChecked.checked && !fourstarChecked.checked && !threestarChecked.checked && !twostarChecked.checked && !onestarChecked.checked) {
        fetchAndRenderHotels(1)
      } else {
         showData(filterData); 
       // pagination(filterData)

      }
   
   }

   
//  ------------------------------------------Search Data------------------------------------ --

//    let Searchinput = document.getElementsByClassName("searchContainer_input");
   
    let Searchinput = document.querySelector(".searchContainer_input");
//    let Searchbtn = document.getElementsByClassName("searchbtn")
   let Searchbtn = document.querySelector(".searchbtn")


   Searchbtn.addEventListener("click",()=>{
    let filter ;
    if(Searchinput == null){
        fetchAndRenderHotels()
    }
    else{
        filter = HotelData.filter((ele)=>{
            if(ele.location.toUpperCase().includes(Searchinput.value.toUpperCase())){
                return true
            }
            if(ele.name.toUpperCase().includes(Searchinput.value.toUpperCase())){
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
   

//    Searchbtn.addEventListener("click",()=>{searchData()});

//    function searchData(){
//     let search;
//     if(Searchinput !=""){
//          search = HotelData.filter((ele)=>{
            
//             if(ele.location.toUpperCase().includes(Searchinput.toUpperCase())){
//                 return true
//             }
//             if(ele.name.toUpperCase().includes(Searchinput.toUpperCase())){
//                 return true
//             }
//             else{
//                 return false
//             }
//         })
//     }
       
//         else {
//             search = HotelData
//         }  
//         console.log(search)
//         showData(search)
    

    
        // showData(HotelData)
    
          
//    }

    //  ----------------------------------Filter Category Data------------------------------------ --

  