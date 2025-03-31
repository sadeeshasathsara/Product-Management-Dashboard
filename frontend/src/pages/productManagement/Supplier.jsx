import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Truck, CandyCane, IceCream, Cake, Dessert, Loader } from 'lucide-react';
import SupplierForm from '../../components/Supplier/SupplierForm';
import SupplierList from '../../components/Supplier/SupplierList';
import axios from 'axios';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch suppliers from backend and update the suppliers list
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:5000/api/product-management/supplier')
      .then((response) => {
        // Map the backend data to match your supplier object structure
        const fetchedSuppliers = response.data.map(supplier => ({
          id: supplier._id,
          name: supplier.name,
          phone: supplier.phoneNumber,
          email: supplier.email,
          address: supplier.address
        }));
        setSuppliers(fetchedSuppliers);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddSupplier = (supplier) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? supplier : s));
    } else {
      setSuppliers([...suppliers, { ...supplier, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const openEditModal = (supplier) => {
    setEditingSupplier(supplier);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f3f3] p-6 relative overflow-hidden">
      {/* Background Sweet Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
        <CandyCane className="absolute top-20 left-10 w-32 h-32 text-amber-500" />
        <IceCream className="absolute bottom-40 left-1/4 w-36 h-36 text-amber-500" />
        <Cake className="absolute bottom-20 right-10 w-40 h-40 text-amber-500" />
        <Dessert className="absolute top-1/4 right-1/3 w-24 h-24 text-amber-500 transform rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-800 flex items-center gap-2">
            <Truck className="w-8 h-8" />
            Supplier Management
          </h1>
          <p className="text-amber-600 mt-1">Our trusted partners in sweet success</p>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add New Supplier
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-10 flex flex-col items-center justify-center">
            <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <p className="text-amber-700 font-medium">Loading supplier data...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SupplierList
              suppliers={suppliers}
              onEdit={openEditModal}
              onDelete={handleDeleteSupplier}
            />
          </motion.div>
        )}

        {/* Modal Popup without Background Animation */}
        {showModal && (
          <div className="fixed inset-0 bg-[#00000095] flex items-center justify-center p-4 z-50 w-screen">
            <motion.div className=" w-full flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg w-3/4">
                <SupplierForm
                  supplier={editingSupplier}
                  onSubmit={handleAddSupplier}
                  onCancel={() => {
                    setShowModal(false);
                    setEditingSupplier(null);
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;