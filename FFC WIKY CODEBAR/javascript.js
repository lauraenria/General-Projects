function processData(data) {
    console.log(data);
    let html = Object.values(data.query.pages).map(buildItemHTML).join("");
    document.querySelector(".result").innerHTML=html;
}

function buildItemHTML(item){
    console.log(item);
    return `<li><a href="https://en.wikipedia.org/?curid=${item.pageid}" target="_blank" >${item.title}</a></li>`;
  }

var onsubmit = function (event) {
    event.preventDefault()
    // we prevent to refresh automatically
    // now we do the Ajax request

    let api =
        "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";

    let searchTerm = document.getElementById("searchTerm").value; //What we type
    /*
    The value attribute is a DOMString that contains the current value of the text entered into the text field. You can retrieve this using the HTMLInputElement.value property in JavaScript.
    let theText = myTextInput.value; look for <input type="text">
    */
    // When accessing the API using a cross-domain AJAX request (CORS), set this to the originating domain. origin=* mean the dominion of Wikipedia can trust any other dominion. (in this case Codepen)

    fetch(api + searchTerm)
        .then(response => {
            response.json().then(processData)
        })

}

document.getElementById('searchForm').addEventListener('submit', onsubmit)