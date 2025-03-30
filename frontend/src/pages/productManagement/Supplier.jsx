import { useState } from 'react';
import { Plus, Truck, CandyCane, IceCream, Cake, Dessert } from 'lucide-react';
import SupplierForm from '../../components/Supplier/SupplierForm';
import SupplierList from '../../components/Supplier/SupplierList';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Sweet Ingredients Co.', phone: '1234567890', email: 'contact@sweetco.com', address: '123 Sugar Lane' },
    { id: 2, name: 'Chocolate Suppliers Ltd', phone: '9876543210', email: 'info@chocolatesuppliers.com', address: '456 Cocoa Street' }
  ]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    <div className="min-h-screen bg-amber-50 p-6 relative overflow-hidden">
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

        <SupplierList
          suppliers={suppliers}
          onEdit={openEditModal}
          onDelete={handleDeleteSupplier}
        />

        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 bg-[#00000095] flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <SupplierForm
                supplier={editingSupplier}
                onSubmit={handleAddSupplier}
                onCancel={() => {
                  setShowModal(false);
                  setEditingSupplier(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;