import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/search`,
      {
        params: { q, category, minPrice, maxPrice },
      }
    );

    const data = res.data;

    if (Array.isArray(data)) {
      setProducts(data);
    } else if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }

  } catch (err) {
    setError(err.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delay);
  }, [q, category, minPrice, maxPrice]);

  return (
    <div className="container">
      <h1> Inventory Search</h1>

      <div className="filters">
        <input
          placeholder="Search product..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button
          className="clear-btn"
          onClick={() => {
            setQ("");
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          Clear
        </button>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && products.length === 0 && !error && (
        <p className="status">No results found</p>
      )}
    </div>
  );
}

export default App;