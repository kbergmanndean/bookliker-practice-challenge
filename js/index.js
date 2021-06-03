document.addEventListener("DOMContentLoaded", function() {


//get books
function getBooks() {
    fetch("http://localhost:3000/books")
    .then(resp=> resp.json())
    .then(data=>data.forEach(renderBooks))
}

getBooks();

//render books function

function renderBooks(book) {
    //create or grab elements
    const ul=document.querySelector("#list")
    const li=document.createElement("li")
    const div=document.querySelector("#show-panel")
    const title=document.createElement("h5")
    const subtitle=document.createElement("h5")
    const thumbnail=document.createElement("img")
    const author=document.createElement("h5")
    const description=document.createElement("p")
    const users=document.createElement("ul")
    const likeButton=document.createElement("button")

    //add content
    li.textContent=book.title
    title.textContent=book.title
    subtitle.textContent=book.subtitle
    thumbnail.src=book.img_url
    author.textContent=book.author
    description.textContent=book.description
    likeButton.textContent="like"

    //append items
    ul.appendChild(li)

    //create ul of users
    book.users.forEach((indUser)=>{
        const username=document.createElement("li")
        username.textContent=indUser.username
        users.append(username)
    })

    //click on book title to make book appear
    li.addEventListener("click", ()=>{
        div.innerHTML=""
        div.append(thumbnail,title,subtitle,author,description,users,likeButton)
    })

    //click on likeButton to send patch request

    likeButton.addEventListener("click", patchLike)

    function patchLike(){
        fetch(`http://localhost:3000/books/${book.id}`, {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"users": [...book.users,{"id":1,"username":"pouros"}]})
        }).then(resp=>resp.json())
        .then((data)=> {const username=document.createElement("li")
        username.textContent=data.users[data.users.length-1].username
        users.append(username)})
    }




}

































});
