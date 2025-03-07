import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>GreatGold Marketplace</h1>
      <div>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((item) => (
            <li key={item._id}>
              <img src={item.image} alt={item.name} width="100" />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default App;
