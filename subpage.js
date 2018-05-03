let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("getting id " + id)

fetch("http://mravocadoman.com/kea/wordpress/wp-json/wp/v2/board_games/"+id)
    .then(e=>e.json())
    .then(showSinglePost)

fetch("http://mravocadoman.com/kea/wordpress/wp-json/wp/v2/food/"+id)
    .then(e=>e.json())
    .then(showSinglePost)

fetch("http://mravocadoman.com/kea/wordpress/wp-json/wp/v2/concert/"+id)
    .then(e=>e.json())
    .then(showSinglePost)

function showSinglePost(aPost){
    console.log(aPost)
    
}