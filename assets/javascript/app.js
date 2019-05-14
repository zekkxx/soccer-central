$(document).ready(function () {

    var googleURL= "https://newsapi.org/v2/everything?q=soccer+teams&apiKey=fb3aa28457e54aeb86cd1dc81bc99f6f"
        console.log(googleURL)
   
    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        $(document).on("click",function() {
        for (let i = 0; i <response.articles.length;i++){
            var articleDiv = $("<div>");        
            var title = response.articles[i].title;
            var url = response.articles[i].url;
            var content = response.articles[i].content;
            var articleInfo = $("<img class='article'>");
            articleDiv.append(articleInfo);
            $("#articleContent").append(articleDiv);
            //making the title the link
            $('<a href="'+url +'"></a>').appendTo($('#articleContent'));
            var a = $('<a>');
            a.attr('href',url);
            a.text(title);
            $('#articleContent').append(a);
            $('#articleContent').append('<br>');
            $("#articleContent").append(content);
            console.log(response.articles.length=10)
            
            }
            })
        
        }
      
     
    )    
})