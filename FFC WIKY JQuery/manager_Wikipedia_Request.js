$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    let title = $("#searchTerm").val();
    console.log(title, "title");
    console.log("#searchTerm", $("#searchTerm"));
    let api =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    let cb = "&callback=JSON_CALLBACK";
  
    const urlWiki = api + title + cb;
    console.log("urlWiki", urlWiki);
  
    function buildItemHTML(item){
      console.log(item);
      return `<li><a href="https://en.wikipedia.org/?curid=${item.pageid}" target="_blank" >${item.title}</a></li>`;
    }
    
    
    $.ajax({
      type: "GET",
      url: urlWiki,
      dataType: "jsonp",
      success: function(data) {
        console.log("############");
        console.log("data", data);
        let pagesKeys = Object.keys(data.query.pages) // in order to know the keys of the Obj
        let titleOfArticles = "";
        pagesKeys.forEach(article=>{
            titleOfArticles += buildItemHTML(data.query.pages[article]);
            // I need to add a a tag with inside the urlArticle e use the escape tag
        })
        
        $('.result').html(titleOfArticles);
      },
      //jsonpCallback : 'JSON_CALLBACK',
      error: function(error) {
        console.log("HTTP error", error);
      }
    });
  });
