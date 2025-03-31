import React, { useState } from 'react';
import StockAddingForm from '../../components/Stock/StockAddingForm';
import StockDetails from '../../components/Stock/StockDetails';
import { Package, Boxes } from 'lucide-react';

const Stock = () => {
  const [stockEntries, setStockEntries] = useState([
    {
      id: 1,
      date: '2023-05-15',
      supplier: 'Tech Distributors Inc.',
      products: [
        { name: 'Laptop Dell XPS 13', quantity: 5, buyPrice: 899.99, sellPrice: 1199.99 },
        { name: 'iPhone 15 Pro', quantity: 10, buyPrice: 999.99, sellPrice: 1099.99 }
      ],
      totalValue: 14499.85
    },
    {
      id: 2,
      date: '2023-05-10',
      supplier: 'Global Electronics Supply',
      products: [
        { name: 'Samsung Galaxy S25', quantity: 8, buyPrice: 799.99, sellPrice: 899.99 },
        { name: 'AirPods Pro 2', quantity: 15, buyPrice: 199.99, sellPrice: 249.99 }
      ],
      totalValue: 9399.77
    }
  ]);

  const handleStockAdded = (newStockEntry) => {
    setStockEntries([newStockEntry, ...stockEntries]);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <Package className="absolute top-20 left-10 w-16 h-16 text-amber-200 opacity-30 animate-float" />
        <Boxes className="absolute bottom-1/4 right-20 w-14 h-14 text-amber-200 opacity-30 animate-float-delay" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-amber-800 mb-2 flex items-center gap-2">
            <Boxes className="w-8 h-8" />
            Inventory Management
          </h1>
          <p className="text-amber-600">Manage your product stock and suppliers</p>
        </div>

        <StockAddingForm onStockAdded={handleStockAdded} />
        <StockDetails stockEntries={stockEntries} />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Stock;