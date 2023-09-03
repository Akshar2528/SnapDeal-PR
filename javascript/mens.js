import navbar from "../components/nav2.js";
document.getElementById("navbar").innerHTML = navbar()

const display = (products) =>{
    products.map((product)=>{
        let img = document.createElement("img")
        img.src = product.image;
        img.classList.add('img-fluid','w-75','h-75')        
        let brand = document.createElement("h3")
        brand.innerHTML = product.brand;
        brand.classList.add('fs-6','text-primary','fw-semibold','text-uppercase')
        let title = document.createElement("h6")
        title.innerHTML = product.title;
        title.classList.add('fw-normal')
        let price = document.createElement("h5")
        price.innerHTML = product.price;
        price.classList.add('fw-normal','fs-5','text-danger')
        let cat = document.createElement("h5")
        cat.innerHTML = product.category;
        cat.classList.add('fw-normal','text-capitalize')
        let btn = document.createElement("button")
        btn.innerHTML = "add to cart";
        btn.classList.add('btn','border','text-white','text-capitalize','bg-primary','border','border-0')
        btn.addEventListener("click", () => {
            if (localStorage.getItem("login")) {
              fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(product)
              })
            }
            else{
              alert("please first login then you can add to cart")
              setTimeout(
                window.location.href="../pages/login.html"
              ,1000)
            }
          })
        let p_box = document.createElement("div")
        p_box.setAttribute("class","p-box")
        p_box.classList.add('p-2','bg-white','text-center')
        p_box.append(img,brand,cat,price,title,btn)
        let div = document.createElement("div")
        div.classList.add('col-xl-3','col-lg-3','col-md-6','col-sm-12','col-xs-12','p-2')
        div.append(p_box)
        document.getElementById("output").append(div)
    })
}

const get = () =>{
    fetch("http://localhost:3000/mens")
    .then((res) => res.json())
    .then((data) =>display(data))
}
get();

fetch('http://localhost:3000/mens')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("search").addEventListener("keypress", () => {
      let search = document.getElementById("search").value
      let results = data.filter(product =>product.title.toLowerCase().includes(search.toLowerCase())
      );
      if (results.length == 0) {
        document.getElementById("output").innerHTML = "prodcuts not found"
      }
      else {
        display(results)
      }
    })
  })