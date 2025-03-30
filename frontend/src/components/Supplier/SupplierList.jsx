import { Edit, Trash2 } from 'lucide-react';

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">Supplier List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{supplier.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{supplier.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{supplier.email}</td>
                  <td className="px-6 py-4 text-sm text-amber-900">{supplier.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(supplier)}
                      className="text-amber-600 hover:text-amber-900 mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;