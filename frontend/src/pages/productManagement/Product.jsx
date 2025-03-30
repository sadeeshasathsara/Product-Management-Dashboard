import { useState } from 'react';
import { CandyCane, IceCream, Cake, Dessert, Candy } from 'lucide-react';
import ProductForm from '../../components/Product/ProductForm';
import ProductList from '../../components/Product/ProductList';
import UpdateForm from '../../components/Product/UpdateForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-amber-50 relative overflow-hidden">
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
            <Dessert className="w-8 h-8" />
            Inventory Items   
          </h1>
          <p className="text-amber-600 mt-1">Efficiently track and manage your products</p>
        </div>

        <div className="bg-white/95 p-6 rounded-lg shadow-md mb-8 border border-amber-100 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
            <CandyCane className="w-5 h-5" />
            Add New Product
          </h2>
          <ProductForm onSubmit={addProduct} />
        </div>

        <div className="bg-white/95 p-6 rounded-lg shadow-md border border-amber-100 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
            <IceCream className="w-5 h-5" />
            Product List
          </h2>
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={deleteProduct}
          />
        </div>
      </div>

      {editingProduct && (
        <UpdateForm
          product={editingProduct}
          onUpdate={updateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default Product;