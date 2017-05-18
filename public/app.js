var app = function(){

  var input = document.getElementById('search-query')
  input.addEventListener("keyup", populateList);

}

var requestComplete = function(){
  //refers to xmlhttprequest object
  if(this.status === 400){
    var outer_div = document.getElementById("albums")
      outer_div.innerHTML = "";
  }

  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var albums = JSON.parse(jsonString);
  albums = albums.albums.items;
  populateList(albums);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url)
  request.addEventListener("load", callback)
  request.send();
}

var handleKeyUp = function() {
  var search = input.value
  var url = "https://api.spotify.com/v1/search?q=" + search + "&type=album"
  makeRequest(url, requestComplete);
}

var populateList = function(albums){
  
  var albumDiv = document.getElementById('albums')
  albums.forEach(function(album){

    var ulTag = document.createElement("ul")

    var albumNameTag = document.createElement("li")
    albumNameTag.innerText = album.name;

    var artistNameTag = document.createElement("li")
    artistNameTag.innerText = album.artists[0].name;

    var imageTag = document.createElement("img")
    imageTag.setAttribute("width", "350px")
    imageTag.setAttribute("heigth", "350px")
    imageTag.setAttribute("src", album.images[0].url);

    albumDiv.appendChild(ulTag);
    ulTag.appendChild(albumNameTag);
    ulTag.appendChild(artistNameTag);
    ulTag.appendChild(imageTag);
  })
}

window.addEventListener('load', app);