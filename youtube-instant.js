var searchQuery=$("#search-query");
var videoTitle=document.getElementById("video-title");
var iframe=$("#youtube-video");
searchQuery.keyup(function(){
 getSearchSuggestions();
});
function getSearchResults(searchSuggestion){
    var searchUrl="http://gdata.youtube.com/feeds/api/videos?q="+searchSuggestion+"&alt=json";
//    alert(searchUrl);
    $.ajax({
        type:'GET',
        url:searchUrl,
        dataType:'jsonp',
        jsonp:'callback',
        success:getData
    });
    function getData(data){
        console.log(data.feed.entry[0]);
        var videoUrl=data.feed.entry[0].link[0].href;
//        var videoTitle=data.feed.entry[0].title.$t;
//        console.log(videoTitle);
        videoUrl="//www.youtube.com/embed/"+videoUrl.split(/[=&]/)[1]+"?autoplay=1";
        console.log(videoUrl);
        videoTitle.innerHTML=data.feed.entry[0].title.$t;
        iframe.attr('src', videoUrl);
    }
}
function getSearchSuggestions(){
    var suggestionUrl="http://suggestqueries.google.com/complete/search?q="+searchQuery.val()+"&output=youtube";
    console.log("getsearch called");
    $.ajax({
        type:'GET',
        url: suggestionUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        success:getData,
        error:function(err){console.log("Error "+err)}
    });
    function getData(data) {
        console.log(data);
        searchSuggestion=data[1][0][0];
//        alert(searchSuggestion);
        getSearchResults(searchSuggestion);
    };
}
