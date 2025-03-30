import { RefreshCw, LayoutDashboard } from "lucide-react";
import MetricCard from "../../components/Dashboard/MetricCard";
import SalesTrendCard from "../../components/Dashboard/SalesTrendCard";
import StockMovementCard from "../../components/Dashboard/StockMovementCard";
import LowStockAlertCard from "../../components/Dashboard/LowStockAlertCard";
import { 
  Boxes, PackageCheck, AlertCircle, 
  Clock, PackageX 
} from "lucide-react";

const Dashboard = () => {
  const metrics = [
    { 
      title: "Total Sweets Value", 
      value: "$48,750", 
      change: "+15%", 
      trend: "up",
      icon: <Boxes className="text-amber-600" size={24} />
    },
    { 
      title: "Sweet Varieties", 
      value: "128 items", 
      change: "+8%", 
      trend: "up",
      icon: <PackageCheck className="text-amber-500" size={24} />
    },
    { 
      title: "Low Stock Alerts", 
      value: "9 items", 
      change: "+3", 
      trend: "down",
      icon: <AlertCircle className="text-amber-500" size={24} />
    },
    { 
      title: "Out-of-Stock", 
      value: "5 items", 
      change: "-2", 
      trend: "up",
      icon: <PackageX className="text-amber-500" size={24} />
    },
    { 
      title: "Incoming Ingredients", 
      value: "7 orders", 
      change: "+4", 
      trend: "up",
      icon: <Clock className="text-amber-500" size={24} />
    },
  ];

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-amber-800">Sweet Shop Dashboard</h1>
          </div>
          <p className="text-amber-600 mt-2 ml-11">Overview of your sweet shop's performance and inventory</p>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-8">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors shadow-sm hover:shadow-md">
            <RefreshCw size={18} className="text-amber-500" />
            <span className="font-medium">Refresh Data</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <SalesTrendCard />
          </div>
          <div>
            <StockMovementCard />
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <LowStockAlertCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;