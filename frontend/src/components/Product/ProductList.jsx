import { Edit, Trash2, IceCream, Cake } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {products.length === 0 ? (
        <div className="text-center py-8 bg-orange-50 rounded-lg">
          <IceCream className="mx-auto h-12 w-12 text-orange-300" />
          <p className="mt-2 text-orange-600">No products added yet.</p>
          <p className="text-orange-400 text-sm">Add your first sweet product!</p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-orange-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-orange-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-orange-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images.length > 0 ? (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover border border-orange-200"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-orange-100 rounded-full border border-orange-200">
                        <Cake className="w-5 h-5 text-orange-400" />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-orange-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-orange-500 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-orange-600 hover:text-orange-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;