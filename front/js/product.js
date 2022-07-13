const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

fetch("http://localhost:3000/api/products/" + id)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(kanap) {
        let photoKanap = document.createElement("img")
        photoKanap.setAttribute("src", kanap.imageUrl)
        let itemImg = document.getElementsByClassName("item__img")[0]
        itemImg.appendChild(photoKanap)

        document.getElementById("title").innerText = kanap.name

        document.getElementById("price").innerText = kanap.price

        document.getElementById("description").innerText = kanap.description

        kanap.colors.forEach(color => {
            let colorSelect = document.createElement("option")
            colorSelect.innerText = color
            colorSelect.setAttribute("value", color)
            document.getElementById("colors").appendChild(colorSelect)
        })


    })
    .catch(function(err) {
        // Une erreur est survenue
    });
let addCart = document.getElementById("addToCart");
addCart.addEventListener("click", function() {

    let arrayCart = localStorage.getItem("arrayCartLocalStorage")

    let objetCart = {
        "id": id,
        "quantity": parseInt(document.getElementById("quantity").value),
        "color": document.getElementById("colors").value
    }

    if (arrayCart == null) {
        arrayCart = [objetCart]

    } else {
        arrayCart = JSON.parse(arrayCart)
        let hasQuantityIncreased = false
        arrayCart.forEach(function(itemCart) {
            if (itemCart.id === objetCart.id && itemCart.color === objetCart.color) {
                hasQuantityIncreased = true
                itemCart.quantity = itemCart.quantity + objetCart.quantity
            }
        })
        if (hasQuantityIncreased === false) {
            arrayCart.push(objetCart)
        }
    }

    localStorage.setItem("arrayCartLocalStorage", JSON.stringify(arrayCart));
})