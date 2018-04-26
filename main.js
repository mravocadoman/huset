const link="http://mravocadoman.com/kea/wordpress/wp-json/wp/v2/";
const urlParams = new URLSearchParams(window.location.search);
const endpoint = urlParams.get("endpoint");
const headerText = urlParams.get("header");
const header = document.querySelector("body>h1"); 
let page = 1;
let lookingForData = false;
function fetchData(){
    lookingForData=true;
    
if(endpoint){
    header.textContent = headerText
    fetchData(link+endpoint+"?_embed&per_page=2&page="+page);  
    console.log(endpoint);
}

function fetchData(link2){
    fetch(link2)
        .then(e => e.json())
        .then(showList)
}
}

function showList(data){
    //console.log(data)
//looping//
    lookingForData=false;
    data.forEach(showSingleGame)
}

function showSingleGame(aGame){
    console.log(aGame);
    let template = document.querySelector("#uctemp").content;
    let clone = template.cloneNode(true);
    
    clone.querySelector("h1").textContent = aGame.title.rendered;
    clone.querySelector(".descript").innerHTML = aGame.content.rendered;
    clone.querySelector(".price span").textContent = aGame.acf.price
    clone.querySelector(".time").textContent = aGame.acf.time
    if(aGame.acf.image.sizes.medium){clone.querySelector("img").setAttribute("src", aGame.acf.image.sizes.medium);
    } else{
         clone.querySelector("img").remove()                            
    }
    
    if(aGame.acf.date){
    let year = aGame.acf.date.substring(0, 4);
    let month = aGame.acf.date.substring(4, 6);
    let day = aGame.acf.date.substring(6, 8);

    clone.querySelector(".date").innerHTML = day + "." + month + "." + year;
    }
    else{  
    }
    
    let gamelist = document.querySelector("#gamelist")
    gamelist.appendChild(clone);
    
}

//if we are at bottom/
setInterval(function(){
    if(bottomVisible() && lookingForData==false){
        console.log("Dead")
        page++;
        fetchData();
    }
}, 100)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

