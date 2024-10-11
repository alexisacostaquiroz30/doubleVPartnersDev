import React, { useEffect, useState } from 'react';
import '../../styles/ProductsList.css';
import { PulseLoader } from 'react-spinners';
import { fetchProducts } from '../../services/productService';
import { useList } from '../../contexts/ListContext';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("todos");
  const [priceIntervals, setPriceIntervals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  const { addToList } = useList();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts();

        setProducts(response);
        setFilteredProducts(response);

        const uniqueCategories = [...new Set(response.map(product => product.productCategoryName))]; 
        setCategories(uniqueCategories);

        const minPrice = Math.floor(Math.min(...response.map(product => parseFloat(product.productPrice))) / 100) * 100;
        const maxPrice = Math.ceil(Math.max(...response.map(product => parseFloat(product.productPrice))) / 100) * 100;

        let intervals = [];
        for (let i = minPrice; i < maxPrice; i += 100) {
          intervals.push({
            label: `$${i} - $${i + 100}`,
            min: i,
            max: i + 100
          });
        }

        setPriceIntervals(intervals);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let tempProducts = [...products]; 

      
      if (searchTerm.trim() !== "") {
        tempProducts = tempProducts.filter((product) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            (product.productName && product.productName.toLowerCase().includes(searchLower)) ||
            (product.productCategoryName && product.productCategoryName.toLowerCase().includes(searchLower)) ||
            (product.productDescription && product.productDescription.toLowerCase().includes(searchLower))
          );
        });
      }

      if (selectedCategory !== "todas") {
        tempProducts = tempProducts.filter(product => product.productCategoryName === selectedCategory);
      }

      if (priceRange !== "todos") {
        const [min, max] = priceRange.split('-').map(Number);
        tempProducts = tempProducts.filter(product => parseFloat(product.productPrice) >= min && parseFloat(product.productPrice) < max);
      }

      setFilteredProducts(tempProducts);
    };

    filterProducts();
  }, [searchTerm ,selectedCategory, priceRange, products]);

  const handlePriceFilter = (e) => {
    const selectedRange = e.target.value;
    setPriceRange(selectedRange);
    setCurrentPage(1); 
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="producList flex min-h-screen" style={{ marginTop: '74px', position: 'relative' }}>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{ pointerEvents: 'none' }}>
          <PulseLoader color="#ffffff" size={15} />
        </div>
      )}

      <main className="flex-grow inline-block bg-gradient-to-bl from-indigo-100 to-black p-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-grow p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {noResults && (
            <div className="text-red-200 font-bold text-center mt-4">
              No se encontraron resultados para "{searchTerm}"
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-bold">Filtros</h3>
            <div className="flex items-center mb-2 space-x-4">
              <div className="flex items-center">
                <label className="mr-2">Precio:</label>
                <select className="border border-gray-300 rounded p-2" value={priceRange} onChange={handlePriceFilter}>
                  <option value="todos">Todos</option>
                  {priceIntervals.map((interval, index) => (
                    <option key={index} value={`${interval.min}-${interval.max}`}>
                      {interval.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="mr-2">Categoría:</label>
                <select className="border border-gray-300 rounded p-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="todas">Todas</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div key={product.productId} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">{product.productName}</h3>
                <p className="text-sm text-gray-600">{product.productDescription}</p>
                <p className="text-green-600 font-bold">${parseFloat(product.productPrice).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Categoria: {product.productCategoryName}</p>
                <button className="mt-2 w-full bg-blue-600 text-white rounded p-2"
                onClick={() => addToList(product)}>
                  Agregar a deseado
                </button>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-between mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 rounded p-2">
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 rounded p-2">
              Siguiente
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsList;
