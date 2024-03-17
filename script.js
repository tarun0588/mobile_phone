let input =document.querySelector("#search_bar");
let btnn =document.querySelector(".search_btn");
let card =document.querySelector(".phones_show");
let showDetail =document.querySelectorAll(".phone_btnn");
let detail=document.querySelector(".details");

detail.style.display="none";

let phone_arrs=[];

btnn.addEventListener("click",(e)=>{
  
    async function fetch_data(){
        let link =await fetch(  `https://openapi.programming-hero.com/api/phones?search=${input.value}`);
        let value=await link.json();
        let arrs=value.data;
        console.log(arrs);
         createcard(arrs); 
  
      }
      fetch_data();
});



function createcard(arrs){
    arrs.forEach(element => {
        // console.log(element);
        let newcard =document.createElement("div")
   newcard.innerHTML=
   ` <img src=${element.image}>
   <h4>${element.phone_name}</h4>
   <p>There are many variations of passages of available, but the majority have suffered</p>
   <button class="phone_btnn">
       SHOW DETAILS
   </button>
   <span class="slu">${element.slug}</span>
   `
   newcard.classList.add("phone_card");

   phone_arrs.push(newcard);
    });
    
    card.replaceChildren(...phone_arrs);
    
   showDetail=document.querySelectorAll(".phone_btnn");  

    details(showDetail);

    phone_arrs=[];
   
}

function details(showDetail){
    showDetail.forEach(e=>{
        
        e.addEventListener("click",async(ele)=>{
            ele.preventDefault()
            let result=ele.target.parentElement.children[4].innerText;
            let link =await fetch(  `https://openapi.programming-hero.com/api/phone/${result}`);
            let value=await link.json();
            let mainfeature=value.data.mainFeatures;
            let data2=value.data;
            let showbtn=document.createElement("div");
            showbtn.innerHTML=
            
            `<img src=${data2.image}>
            <h4>${data2.name}</h4>
            <h5>Brand:${data2.brand}</h5>
            <p>Storage:${mainfeature.storage}</p>
            <p>displaySize:${mainfeature.
                displaySize}</p>
            <p>chipSet:${mainfeature.
                chipSet}</p>
            <p>memory:${mainfeature.
                memory}</p>
                <p>sensors:${mainfeature.
                    sensors}</p>
                <button class="close" >Close</button>    
     `      
           
            detail.replaceChildren(showbtn);
            detail.style.display="block";
            let close=document.querySelector(".close");
            close.addEventListener("click",(cls)=>{
                cls.preventDefault();
                detail.style.display="none";
            })
        });

    })
}