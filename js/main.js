var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productSearch = document.getElementById("productSearch");
var productList;

var indexupdate = 0;
var regex;
var regexPrice;



if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProducts(productList);
}
else {
    productList = [];
}
function search() {
    var productListSearch = [];
    var productSearchValue = productSearch.value
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.includes(productSearchValue)) {
            productListSearch.push(productList[i]);   
        }
    }
    displayProducts(productListSearch)

}
function addProduct() {


    var productInput = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    }
    productList.push(productInput)
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProducts(productList);
    clearform();
    

}
function validationProduct() {
    
    var countValid = 0;
    regex = /[a-z]{3,}/i
    regexPrice = /[0-9]{2,}/
    if (regex.test(productName.value)) {
        countValid++;
    }
    else {
        document.getElementById("alert-name").style.display = "inline"

    }

    if (regexPrice.test(productPrice.value)) {
        countValid++;
    }
    else {
        document.getElementById("alert-price").style.display = "inline"

    }


    if (regex.test(productCategory.value)) {
        countValid++;
    }
    else {
        document.getElementById("alert-category").style.display = "inline"


    }

    if (regex.test(productDescription.value)) {
        countValid++;
    }
    else {
        document.getElementById("alert-description").style.display = "inline"

    }
    if (countValid == 4) {
        document.getElementById("alert-name").style.display = "none"
        document.getElementById("alert-price").style.display = "none"
        document.getElementById("alert-category").style.display = "none"
        document.getElementById("alert-description").style.display = "none"
        addProduct()
    }
}
function clearform() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function updateProduct(i) {
    indexupdate = i;
    productName.value = productList[i].name;
    productPrice.value = productList[i].price;
    productCategory.value = productList[i].category;
    productDescription.value = productList[i].description;
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProducts(productList);
    document.getElementById("btn-edit").style.display = "inline"
    document.getElementById("btn-add").style.display = "none"
}
function editProduct() {
    productList[indexupdate].name = productName.value;
    productList[indexupdate].price = productPrice.value;
    productList[indexupdate].category = productCategory.value;
    productList[indexupdate].description = productDescription.value;
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProducts(productList);
    document.getElementById("btn-edit").style.display = "none"
    document.getElementById("btn-add").style.display = "inline"

}
function deleteProduct(i) {
    productList.splice(i, 1);
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProducts(productList);
    clearform()
    document.getElementById("btn-edit").style.display = "none"
    document.getElementById("btn-add").style.display = "inline"


}

function displayProducts(productList) {
        var temp = ""
        for (var i = 0; i < productList.length; i++) {
            temp += `
        <tr>
             <td>${i}</td>
             <td>${productList[i].name}</td>
             <td>${productList[i].price}</td>
             <td>${productList[i].category}</td>
             <td>${productList[i].description}</td>
             <td> <button class="btn btn-outline-info btn-sm " id="btnEdit" onclick="updateProduct(${i})">Update
                  </button>
             </td>
             <td> <button class="btn btn-outline-danger btn-sm " id="btn" onclick="deleteProduct(${i})">Delete
                  </button>
            </td>
        </tr> `
        }
        document.getElementById("table-data").innerHTML = temp;
    
}