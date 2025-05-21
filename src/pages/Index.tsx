
import { useState } from "react";
import { ShoppingLayout } from "@/components/ShoppingLayout";
import { ChatInterface } from "@/components/ChatInterface";
import { ProductGrid } from "@/components/ProductGrid";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { Product } from "@/types/product";

const Index = () => {
  const [chatMessages, setChatMessages] = useState<Array<{type: string, content: string}>>([
    {
      type: "assistant",
      content: "Hello! I'm your shopping assistant. What would you like to buy today?"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setChatMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);

    // Simulate a backend call
    setTimeout(() => {
      // Add AI response
      setChatMessages(prev => [
        ...prev, 
        { type: "assistant", content: `I found some great options for "${message}". Take a look below!` }
      ]);
      
      setSearchQuery(message);
      
      // Simulate product results
      const mockProducts = generateMockProducts(message);
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  };

  const handleRefineSearch = (refinement: string) => {
    handleSendMessage(`Show me ${refinement}`);
  };

  const handleCheckoutConfirm = () => {
    // Add confirmation message
    setChatMessages(prev => [
      ...prev, 
      { type: "assistant", content: `Great choice! Your order for ${selectedProduct?.title} has been placed.` }
    ]);
    setCheckoutOpen(false);
    setProducts([]);
  };

  const handleCheckoutCancel = () => {
    setCheckoutOpen(false);
  };

  return (
    <ShoppingLayout>
      <div className="flex flex-col h-full">
        <ChatInterface 
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        
        <ProductGrid 
          products={products}
          onProductSelect={handleProductSelect}
          onRefineSearch={handleRefineSearch}
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
        
        <CheckoutDialog 
          open={checkoutOpen}
          product={selectedProduct}
          onConfirm={handleCheckoutConfirm}
          onCancel={handleCheckoutCancel}
        />
      </div>
    </ShoppingLayout>
  );
};

// Helper function to generate mock products
function generateMockProducts(query: string): Product[] {
  const baseProducts = [
    {
      id: "1",
      title: `Premium ${query}`,
      price: 599,
      rating: 4.5,
      image: "/placeholder.svg",
      source: "Amazon",
      description: `High-quality ${query} with premium features and excellent customer reviews.`
    },
    {
      id: "2",
      title: `Budget ${query}`,
      price: 299,
      rating: 4.0,
      image: "/placeholder.svg",
      source: "Flipkart",
      description: `Affordable ${query} that offers great value for money.`
    },
    {
      id: "3",
      title: `${query} Pro`,
      price: 899,
      rating: 4.8,
      image: "/placeholder.svg",
      source: "Amazon",
      description: `Professional-grade ${query} with advanced features for enthusiasts.`
    },
    {
      id: "4",
      title: `${query} Lite`,
      price: 199,
      rating: 3.9,
      image: "/placeholder.svg",
      source: "Flipkart",
      description: `Entry-level ${query} perfect for beginners or as a backup.`
    },
    {
      id: "5",
      title: `${query} Plus`,
      price: 699,
      rating: 4.3,
      image: "/placeholder.svg",
      source: "Amazon",
      description: `Enhanced ${query} with bonus features and improved performance.`
    },
    {
      id: "6",
      title: `Classic ${query}`,
      price: 399,
      rating: 4.2,
      image: "/placeholder.svg",
      source: "Flipkart",
      description: `Traditional ${query} with time-tested reliability and function.`
    }
  ];
  
  return baseProducts;
}

export default Index;
