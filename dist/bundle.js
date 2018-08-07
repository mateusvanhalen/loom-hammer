(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
    Purpose: Store and retrieve data from remote API
*/

const APIObject = {

}

/*
    Purpose: Make GET request to API to retrieve data
*/
APIObject.getTypes = () => {
    return fetch("http://localhost:8088/types")
        .then(response => response.json());
}

/*
    Purpose: Retrieves all product objects from API
*/
APIObject.getProducts = () => {
    return fetch("http://localhost:8088/inventory")
    .then(response => response.json());
}

/*
    Purpose: POSTs (creates) a new product in the API
*/
APIObject.saveProduct = (product) => {
    return fetch("http://localhost:8088/inventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
}

module.exports = APIObject



},{}],2:[function(require,module,exports){
const DataManager = require("./data/DataManager")
const renderProductList = require("./product/ProductList")
const renderNavBar = require("./nav/NavBar")
const renderForm = require("./product/ProductForm")


const saveProduct = (product) => {
    // Save the product to the API
    DataManager.saveProduct(product)
    .then(() => {
        renderProductList(product.type)
    })
}

renderNavBar().then(html => {
    document.querySelector("#navigation").innerHTML = html
    document.querySelector("#navbar").addEventListener("click", event => {
        const typeClickedOn = parseInt(event.target.id.split("--")[1])
        renderProductList(typeClickedOn)
    })
})
// renderProductList()
renderForm("#container", saveProduct)




},{"./data/DataManager":1,"./nav/NavBar":3,"./product/ProductForm":4,"./product/ProductList":5}],3:[function(require,module,exports){
const DataManager = require("../data/DataManager")

function renderNavBar () {
    return DataManager.getTypes().then(types => {
        let navHTML = "<nav id=\"navbar\">"

        types.forEach(type => {
            navHTML += `<a id="type--${type.id}" href="#">${type.description}</a>`
        })

        navHTML += "<a href=\"#\">Create Product</a>"
        navHTML += "</nav>"

        return navHTML
    })
}

module.exports = renderNavBar

},{"../data/DataManager":1}],4:[function(require,module,exports){
const DataManager = require("../data/DataManager")
const renderProductList = require("./ProductList")

let instructions = null

/*
    Purpose: Adds the event listener to the Save Product button
        and construct the object to be saved to the API when the
        button is clicked
*/
const addListener = () => {
    document.querySelector(".btn--saveProduct")
        .addEventListener("click", () => {
            const product = { }
            product.name = document.querySelector("#productName").value
            product.description = document.querySelector("#productDescription").value
            product.price = document.querySelector("#productPrice").value
            product.quantity = document.querySelector("#productQuantity").value
            product.type = document.querySelector("#productType").value

            instructions(product)
        })
}

/*
    Purpose: Build the product form component
    Arguments: types (string) - The option strings to put in the select
*/
const buildFormTemplate = (types) => {
    return `
        <fieldset>
            <label for="productName">Product name:</label>
            <input required type="text" name="productName" id="productName">
        </fieldset>
        <fieldset>
            <label for="productDescription">Description:</label>
            <input required type="text" name="productDescription" id="productDescription">
        </fieldset>
        <fieldset>
            <label for="productPrice">Price:</label>
            <input required type="number" name="productPrice" id="productPrice">
        </fieldset>
        <fieldset>
            <label for="productQuantity">Quantity:</label>
            <input required type="number" name="productQuantity" id="productQuantity">
        </fieldset>
        <fieldset>
            <label for="productType">Category:</label>
            <select required name="productType" id="productType">
            ${types.join("")}
            </select>
        </fieldset>
        <button class="btn btn--saveProduct">Save Product</button>
    `
}

/*
    Purpose: Renders the form component to the target element
    Arguments: targetElement (string) - Query selector string for HTML element
*/
const renderForm = (targetElement, saveInstructions) => {
    instructions = saveInstructions
    return DataManager.getTypes()
        .then(types => {
            // Build options from the product types
            const options = types.map(type => {
                return `<option value="${type.id}">${type.description}</option>`
            })

            // Render the form to the DOM
            document.querySelector(targetElement).innerHTML = buildFormTemplate(options)

            // Now that it's on the DOM, add the event listener
            addListener()
        })
}

module.exports = renderForm

},{"../data/DataManager":1,"./ProductList":5}],5:[function(require,module,exports){
const DataManager = require("../data/DataManager")

function renderProductList (productTypeId) {
    DataManager.getProducts()
        .then((products) => {
            const container = document.querySelector("#container")
            container.textContent = ""
            // Filter all products to the ones that have the correct type
            const filteredProducts = products.filter(product => {
                return product.type === productTypeId
            })

            // Display only the products that are of the correct type
            filteredProducts.forEach(product => {
                container.innerHTML += `<p>${product.name} $${product.price}</p>`
            })
        })
}

module.exports = renderProductList

},{"../data/DataManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEvRGF0YU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL25hdi9OYXZCYXIuanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdEZvcm0uanMiLCIuLi9zY3JpcHRzL3Byb2R1Y3QvUHJvZHVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAgICBQdXJwb3NlOiBTdG9yZSBhbmQgcmV0cmlldmUgZGF0YSBmcm9tIHJlbW90ZSBBUElcbiovXG5cbmNvbnN0IEFQSU9iamVjdCA9IHtcblxufVxuXG4vKlxuICAgIFB1cnBvc2U6IE1ha2UgR0VUIHJlcXVlc3QgdG8gQVBJIHRvIHJldHJpZXZlIGRhdGFcbiovXG5BUElPYmplY3QuZ2V0VHlwZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3R5cGVzXCIpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbi8qXG4gICAgUHVycG9zZTogUmV0cmlldmVzIGFsbCBwcm9kdWN0IG9iamVjdHMgZnJvbSBBUElcbiovXG5BUElPYmplY3QuZ2V0UHJvZHVjdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludmVudG9yeVwiKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbi8qXG4gICAgUHVycG9zZTogUE9TVHMgKGNyZWF0ZXMpIGEgbmV3IHByb2R1Y3QgaW4gdGhlIEFQSVxuKi9cbkFQSU9iamVjdC5zYXZlUHJvZHVjdCA9IChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludmVudG9yeVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3QpXG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQVBJT2JqZWN0XG5cblxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi9kYXRhL0RhdGFNYW5hZ2VyXCIpXG5jb25zdCByZW5kZXJQcm9kdWN0TGlzdCA9IHJlcXVpcmUoXCIuL3Byb2R1Y3QvUHJvZHVjdExpc3RcIilcbmNvbnN0IHJlbmRlck5hdkJhciA9IHJlcXVpcmUoXCIuL25hdi9OYXZCYXJcIilcbmNvbnN0IHJlbmRlckZvcm0gPSByZXF1aXJlKFwiLi9wcm9kdWN0L1Byb2R1Y3RGb3JtXCIpXG5cblxuY29uc3Qgc2F2ZVByb2R1Y3QgPSAocHJvZHVjdCkgPT4ge1xuICAgIC8vIFNhdmUgdGhlIHByb2R1Y3QgdG8gdGhlIEFQSVxuICAgIERhdGFNYW5hZ2VyLnNhdmVQcm9kdWN0KHByb2R1Y3QpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZW5kZXJQcm9kdWN0TGlzdChwcm9kdWN0LnR5cGUpXG4gICAgfSlcbn1cblxucmVuZGVyTmF2QmFyKCkudGhlbihodG1sID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdmlnYXRpb25cIikuaW5uZXJIVE1MID0gaHRtbFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVDbGlja2VkT24gPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcbiAgICAgICAgcmVuZGVyUHJvZHVjdExpc3QodHlwZUNsaWNrZWRPbilcbiAgICB9KVxufSlcbi8vIHJlbmRlclByb2R1Y3RMaXN0KClcbnJlbmRlckZvcm0oXCIjY29udGFpbmVyXCIsIHNhdmVQcm9kdWN0KVxuXG5cblxuIiwiY29uc3QgRGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi4vZGF0YS9EYXRhTWFuYWdlclwiKVxuXG5mdW5jdGlvbiByZW5kZXJOYXZCYXIgKCkge1xuICAgIHJldHVybiBEYXRhTWFuYWdlci5nZXRUeXBlcygpLnRoZW4odHlwZXMgPT4ge1xuICAgICAgICBsZXQgbmF2SFRNTCA9IFwiPG5hdiBpZD1cXFwibmF2YmFyXFxcIj5cIlxuXG4gICAgICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICBuYXZIVE1MICs9IGA8YSBpZD1cInR5cGUtLSR7dHlwZS5pZH1cIiBocmVmPVwiI1wiPiR7dHlwZS5kZXNjcmlwdGlvbn08L2E+YFxuICAgICAgICB9KVxuXG4gICAgICAgIG5hdkhUTUwgKz0gXCI8YSBocmVmPVxcXCIjXFxcIj5DcmVhdGUgUHJvZHVjdDwvYT5cIlxuICAgICAgICBuYXZIVE1MICs9IFwiPC9uYXY+XCJcblxuICAgICAgICByZXR1cm4gbmF2SFRNTFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyTmF2QmFyXG4iLCJjb25zdCBEYXRhTWFuYWdlciA9IHJlcXVpcmUoXCIuLi9kYXRhL0RhdGFNYW5hZ2VyXCIpXG5jb25zdCByZW5kZXJQcm9kdWN0TGlzdCA9IHJlcXVpcmUoXCIuL1Byb2R1Y3RMaXN0XCIpXG5cbmxldCBpbnN0cnVjdGlvbnMgPSBudWxsXG5cbi8qXG4gICAgUHVycG9zZTogQWRkcyB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIFNhdmUgUHJvZHVjdCBidXR0b25cbiAgICAgICAgYW5kIGNvbnN0cnVjdCB0aGUgb2JqZWN0IHRvIGJlIHNhdmVkIHRvIHRoZSBBUEkgd2hlbiB0aGVcbiAgICAgICAgYnV0dG9uIGlzIGNsaWNrZWRcbiovXG5jb25zdCBhZGRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tc2F2ZVByb2R1Y3RcIilcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0geyB9XG4gICAgICAgICAgICBwcm9kdWN0Lm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3ROYW1lXCIpLnZhbHVlXG4gICAgICAgICAgICBwcm9kdWN0LmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9kdWN0RGVzY3JpcHRpb25cIikudmFsdWVcbiAgICAgICAgICAgIHByb2R1Y3QucHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RQcmljZVwiKS52YWx1ZVxuICAgICAgICAgICAgcHJvZHVjdC5xdWFudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZHVjdFF1YW50aXR5XCIpLnZhbHVlXG4gICAgICAgICAgICBwcm9kdWN0LnR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2R1Y3RUeXBlXCIpLnZhbHVlXG5cbiAgICAgICAgICAgIGluc3RydWN0aW9ucyhwcm9kdWN0KVxuICAgICAgICB9KVxufVxuXG4vKlxuICAgIFB1cnBvc2U6IEJ1aWxkIHRoZSBwcm9kdWN0IGZvcm0gY29tcG9uZW50XG4gICAgQXJndW1lbnRzOiB0eXBlcyAoc3RyaW5nKSAtIFRoZSBvcHRpb24gc3RyaW5ncyB0byBwdXQgaW4gdGhlIHNlbGVjdFxuKi9cbmNvbnN0IGJ1aWxkRm9ybVRlbXBsYXRlID0gKHR5cGVzKSA9PiB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3ROYW1lXCI+UHJvZHVjdCBuYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJvZHVjdE5hbWVcIiBpZD1cInByb2R1Y3ROYW1lXCI+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0RGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByb2R1Y3REZXNjcmlwdGlvblwiIGlkPVwicHJvZHVjdERlc2NyaXB0aW9uXCI+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0UHJpY2VcIj5QcmljZTo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicHJvZHVjdFByaWNlXCIgaWQ9XCJwcm9kdWN0UHJpY2VcIj5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RRdWFudGl0eVwiPlF1YW50aXR5OjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJwcm9kdWN0UXVhbnRpdHlcIiBpZD1cInByb2R1Y3RRdWFudGl0eVwiPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdFR5cGVcIj5DYXRlZ29yeTo8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCByZXF1aXJlZCBuYW1lPVwicHJvZHVjdFR5cGVcIiBpZD1cInByb2R1Y3RUeXBlXCI+XG4gICAgICAgICAgICAke3R5cGVzLmpvaW4oXCJcIil9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tLXNhdmVQcm9kdWN0XCI+U2F2ZSBQcm9kdWN0PC9idXR0b24+XG4gICAgYFxufVxuXG4vKlxuICAgIFB1cnBvc2U6IFJlbmRlcnMgdGhlIGZvcm0gY29tcG9uZW50IHRvIHRoZSB0YXJnZXQgZWxlbWVudFxuICAgIEFyZ3VtZW50czogdGFyZ2V0RWxlbWVudCAoc3RyaW5nKSAtIFF1ZXJ5IHNlbGVjdG9yIHN0cmluZyBmb3IgSFRNTCBlbGVtZW50XG4qL1xuY29uc3QgcmVuZGVyRm9ybSA9ICh0YXJnZXRFbGVtZW50LCBzYXZlSW5zdHJ1Y3Rpb25zKSA9PiB7XG4gICAgaW5zdHJ1Y3Rpb25zID0gc2F2ZUluc3RydWN0aW9uc1xuICAgIHJldHVybiBEYXRhTWFuYWdlci5nZXRUeXBlcygpXG4gICAgICAgIC50aGVuKHR5cGVzID0+IHtcbiAgICAgICAgICAgIC8vIEJ1aWxkIG9wdGlvbnMgZnJvbSB0aGUgcHJvZHVjdCB0eXBlc1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHR5cGVzLm1hcCh0eXBlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxvcHRpb24gdmFsdWU9XCIke3R5cGUuaWR9XCI+JHt0eXBlLmRlc2NyaXB0aW9ufTwvb3B0aW9uPmBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIFJlbmRlciB0aGUgZm9ybSB0byB0aGUgRE9NXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldEVsZW1lbnQpLmlubmVySFRNTCA9IGJ1aWxkRm9ybVRlbXBsYXRlKG9wdGlvbnMpXG5cbiAgICAgICAgICAgIC8vIE5vdyB0aGF0IGl0J3Mgb24gdGhlIERPTSwgYWRkIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgYWRkTGlzdGVuZXIoKVxuICAgICAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckZvcm1cbiIsImNvbnN0IERhdGFNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2RhdGEvRGF0YU1hbmFnZXJcIilcblxuZnVuY3Rpb24gcmVuZGVyUHJvZHVjdExpc3QgKHByb2R1Y3RUeXBlSWQpIHtcbiAgICBEYXRhTWFuYWdlci5nZXRQcm9kdWN0cygpXG4gICAgICAgIC50aGVuKChwcm9kdWN0cykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIilcbiAgICAgICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCJcbiAgICAgICAgICAgIC8vIEZpbHRlciBhbGwgcHJvZHVjdHMgdG8gdGhlIG9uZXMgdGhhdCBoYXZlIHRoZSBjb3JyZWN0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUHJvZHVjdHMgPSBwcm9kdWN0cy5maWx0ZXIocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3QudHlwZSA9PT0gcHJvZHVjdFR5cGVJZFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBvbmx5IHRoZSBwcm9kdWN0cyB0aGF0IGFyZSBvZiB0aGUgY29ycmVjdCB0eXBlXG4gICAgICAgICAgICBmaWx0ZXJlZFByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCArPSBgPHA+JHtwcm9kdWN0Lm5hbWV9ICQke3Byb2R1Y3QucHJpY2V9PC9wPmBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyUHJvZHVjdExpc3RcbiJdfQ==
