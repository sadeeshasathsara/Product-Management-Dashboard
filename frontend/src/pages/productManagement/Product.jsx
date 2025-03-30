import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, Candy } from 'lucide-react';
import ProductForm from '../../components/Product/ProductForm';
import ProductList from '../../components/Product/ProductList';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setShowAddModal(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddModal]);

  return (
    <div className="min-h-screen p-6 bg-amber-50 relative overflow-hidden">
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
          <ProductList
            products={filteredProducts}
            onDelete={deleteProduct}
          />
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
              className="relative bg-white p-8 rounded-lg shadow-xl w-full sm:w-96"
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
              {/* Close Button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-2 right-2 text-amber-500 hover:text-amber-700"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Product Form */}
              <ProductForm onSubmit={addProduct} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;
