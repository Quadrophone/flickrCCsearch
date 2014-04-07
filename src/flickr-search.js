document.addEventListener('DOMContentLoaded', function () {
  var photoContainer = document.getElementById('results');
  var searchForm = document.getElementById("form");  

  searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    photoContainer.innerHTML = "";
    var searchTerm = document.getElementById('searchTerm').value;
    var QUERY = searchTerm;
    (function () {
  for(var els = document.getElementsByTagName ('a'), i = els.length; i--;)
    els.addEventListener("click", function(e){
      e.preventDefault();
    })
})();

    var photoGenerator = {
      searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=81652f3769767d86cdd958569fc9246f&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'license=4,7&' + 
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=500',

      requestphotos: function() {
        var req = new XMLHttpRequest();
        req.open("GET", this.searchOnFlickr_, true);
        req.onload = this.showPhotos_.bind(this);
        req.send(null);
      },
      showPhotos_: function (e) {
        var photos = e.target.responseXML.querySelectorAll('photo');
        for (var i = 0; i < photos.length; i++) {
          var img = document.createElement('img');
          var a = document.createElement('a');
          a.href = this.constructFullURL_(photos[i]);
          a.target = '_blank';
          img.src = this.constructphotoURL_(photos[i]);
          img.setAttribute('alt', photos[i].getAttribute('title'));
          photoContainer.appendChild(a);
          a.appendChild(img);
       
        }
      },
      constructFullURL_: function (photo) {
        return "http://www.flickr.com/photos/" + photo.getAttribute("owner") + "/" + photo.getAttribute("id");
      },

      constructphotoURL_: function (photo) {
        return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_m.jpg";
      }
    };

    photoGenerator.requestphotos();


  });
});
