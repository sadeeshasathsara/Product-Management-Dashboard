import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, CandyCane, IceCream, Cake, Dessert, Candy } from 'lucide-react';
import axios from 'axios';
import ProductForm from '../../components/Product/ProductForm';
import ProductList from '../../components/Product/ProductList';
import EditProductForm from '../../components/Product/EditProductForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from backend API
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:5000/api/product-management/product')
      .then(response => {
        // Assuming your API returns an array of products directly
        setProducts(response.data.products);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const addProduct = (newProduct) => {
    // Append new product locally and let the API refresh be handled elsewhere if needed
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setShowAddModal(false);
  };

  const deleteProduct = (id) => {
    // Optionally, you can add an API call here to delete on backend.
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (editedProduct) => {
    setProducts(products.map(product =>
      product.id === editedProduct.id ? editedProduct : product
    ));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = (updatedProduct) => {
    setProducts(
      products.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
  };

  useEffect(() => {
    if (showAddModal || showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddModal, showEditModal]);

  return (
    <div className="min-h-screen p-6 bg-[#f4f3f3] relative overflow-hidden">
      {/* Optimized visible background icons */}
      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
        <CandyCane className="absolute top-[10%] left-[5%] w-28 h-28 text-amber-400/50" />
        <IceCream className="absolute bottom-[25%] left-[15%] w-32 h-32 text-amber-400/50" />
        <Cake className="absolute bottom-[10%] right-[5%] w-36 h-36 text-amber-400/50" />
        <Dessert className="absolute top-[20%] right-[20%] w-24 h-24 text-amber-400/50" />
        <Candy className="absolute top-[35%] right-[15%] w-28 h-28 text-amber-400/50" />
        <CandyCane className="absolute bottom-[30%] left-[25%] w-20 h-20 text-amber-400/50 transform -rotate-12" />
        <IceCream className="absolute top-[15%] right-[10%] w-24 h-24 text-amber-400/50" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-amber-800 flex items-center gap-2">
            <Candy className="w-8 h-8" />
            Inventory Items
          </h1>
          <p className="text-amber-600 mt-1">Efficiently track and manage your products</p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition duration-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mb-8"
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Product</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/95 p-6 rounded-lg shadow-md border border-amber-100 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold text-amber-700 mb-4">Product List</h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                className="h-20 w-20 rounded-full border-t-4 border-amber-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.p
                className="mt-4 text-amber-600 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading sweet treats...
              </motion.p>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              onDelete={deleteProduct}
              onEdit={handleEdit}
            />
          )}
        </motion.div>
      </div>

      {/* Modal for adding product */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
              initial={{ y: -100, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-amber-700">Add New Product</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-amber-100 transition-colors"
                >
                  <X className="w-6 h-6 text-amber-500" />
                </button>
              </div>

              {/* Product Form */}
              <ProductForm onSubmit={addProduct} onCancel={() => setShowAddModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for editing product */}
      <AnimatePresence>
        {showEditModal && editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              className="relative bg-white p-8 rounded-lg shadow-xl w-3/4 h-3/4 overflow-y-scroll"
              initial={{ y: -100, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              }}
            >
              {/* Edit Product Form */}
              <EditProductForm
                product={editingProduct}
                onSubmit={handleEditSubmit}
                onClose={() => setShowEditModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;