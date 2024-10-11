import React, { useEffect, useState } from 'react';
import '../../styles/ProductsList.css';
import { PulseLoader } from 'react-spinners';
import { getWishlist } from '../../services/wishlistItemService';

const PurchaseHistory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await getWishlist();
        setProducts(response);
        setFilteredProducts(response);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = () => {
      let tempProducts = [...products];

      if (searchTerm.trim() !== "") {
        tempProducts = tempProducts.filter((product) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            (product.wishlistProductName && product.wishlistProductName.toLowerCase().includes(searchLower)) ||
            (product.productCategoryName && product.productCategoryName.toLowerCase().includes(searchLower)) ||
            (product.productDescription && product.productDescription.toLowerCase().includes(searchLower))
          );
        });
      }

      tempProducts.sort((a, b) => {
        let comparison = 0;
        switch (sortOption) {
          case "name":
            comparison = (a.wishlistProductName || '').localeCompare(b.wishlistProductName || '');
            break;
          case "date":
            comparison = new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0);
            break;
          case "price":
            comparison = parseFloat(a.wishlistProductPrice || 0) - parseFloat(b.wishlistProductPrice || 0);
            break;
          default:
            return 0;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });

      setFilteredProducts(tempProducts);
      setNoResults(tempProducts.length === 0);
    };

    filterAndSortProducts();
  }, [searchTerm, sortOption, sortOrder, products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
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
          <div className="flex items-center mb-4 space-x-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-grow p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              className="p-2 border border-gray-300 rounded"
              value={sortOption}
              onChange={handleSort}
            >
              <option value="name">Ordenar por nombre</option>
              <option value="date">Ordenar por fecha</option>
              <option value="price">Ordenar por precio</option>
            </select>
            <select
              className="p-2 border border-gray-300 rounded"
              value={sortOrder}
              onChange={handleSortOrder}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          {noResults && (
            <div className="text-red-200 font-bold text-center mt-4">
              No se encontraron resultados para "{searchTerm}"
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div key={product.$id} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">{product.wishlistProductName || 'Sin nombre'}</h3>
                <p className="text-sm text-gray-600">{product.wishlistProductDescription || 'Sin descripción'}</p>
                <p className="text-green-600 font-bold">${parseFloat(product.wishlistProductPrice || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500">Agregado: {product.wishlistAddedDate ? new Date(product.wishlistAddedDate).toLocaleDateString() : 'Fecha desconocida'}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
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

export default PurchaseHistory;