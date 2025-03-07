document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById("products");
            productsContainer.innerHTML = "";
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product");
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Price: $${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function addToCart(name, price) {
    alert(`Added ${name} to cart!`);
}
