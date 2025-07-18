import { useState } from 'react';
import './App.css';

function SearchBar({setStock, setSearch}) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  //In the line 15
  // const handleCheckBox = (e) => {
  //   setStock(e.target.checked);
  // } 
  return (
    <form>
      <input type='text' placeholder='Search...' onChange={handleChange}/><br/>
      <label><input type='checkbox' onChange={(e) => {setStock(e.target.checked)}} /> Only show products in stock</label>
    </form>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan='2'>{category}</th>
    </tr>
  );
}

function ProductRow({product, search}) {
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>{ product.name }</span>;
  if (!product.name.toLowerCase().includes(search.toLowerCase())) {
    return null;
  }
  return (
    <tr>
      <td>{ name }</td>
      <td>{ product.price }</td>
    </tr>
  );
}

function ProductTable({products, search}) {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={ product.category }
          key={ product.category } />
      );
    }
    rows.push(
      <ProductRow 
        product={ product }
        search={ search }
        key={ product.name } />
    );
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({products}) {
  const [stock, setStock] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div>
      <SearchBar setStock={setStock} setSearch={setSearch} />
      <ProductTable products={ products.filter(product => !stock || product.stocked) } search={search}/>
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={ PRODUCTS }/>;
}

