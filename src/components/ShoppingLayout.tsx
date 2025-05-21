
import { ReactNode } from "react";
import { Search, ShoppingCart, Heart } from "lucide-react";

interface ShoppingLayoutProps {
  children: ReactNode;
}

export const ShoppingLayout = ({ children }: ShoppingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-shop-primary mr-2">ShopAI</h1>
            <span className="bg-shop-light text-shop-primary text-xs px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-shop-primary rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-shop-primary rounded-full hover:bg-gray-100">
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-shop-primary rounded-full hover:bg-gray-100">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>ShopAI - Smart Shopping Assistant</p>
          <p className="text-xs mt-1">© 2025 ShopAI. This is a demo frontend.</p>
        </div>
      </footer>
    </div>
  );
};
