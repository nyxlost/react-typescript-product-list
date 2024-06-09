import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import useDebounce from '../hook/useDebounce';
import { fetchProducts } from '../store/slices/productSlice';
import { RootState, AppDispatch } from '../store/store';
import { Product } from '../interfaces/interfaceProduct'

type Props = {}

export default function HomePage({ }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (filter === 'price_above_1000') {
      filtered = filtered.filter(product => product.price >= 1000);
    } else if (filter === 'discount_percentage') {
      filtered = filtered.filter(product => product.discountPercentage > 1);
    } else if (filter === 'sort_by_rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'sort_by_price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }
    if (debouncedSearchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [filter, products, debouncedSearchTerm]);

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredProducts]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-20">
        <h1 className="text-2xl font-bold mb-5">Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="flex">
              <Filter filter={filter} onFilterChange={handleFilterChange} />
              <div className="mx-5">
                <label htmlFor="search" className="mr-2">Search:</label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/5 py-2">Thumbnail</th>
                  <th className="w-1/4 py-2">Title</th>
                  <th className="w-1/7 py-2">Price</th>
                  <th className="w-1/7 py-2">Stock</th>
                  <th className="w-1/7 py-2">Rating</th>
                  <th className="w-1/7 py-2">Total Price</th>
                  <th className="w-1/6 py-2">Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product: Product) => (
                  <tr key={product.id} className="text-center">
                    <td className="py-2">
                      <img src={product.thumbnail} alt={product.title} className="w-16 h-16 mx-auto" />
                    </td>
                    <td className="py-2">{product.title}</td>
                    <td className="py-2">${product.price}</td>
                    <td className="py-2">{product.stock}</td>
                    <td className="py-2">{product.rating}</td>
                    <td className="py-2">${product.totalPrice}</td>
                    <td className="py-2">
                      <Link to={`/products/${product.id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Detail</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
}
