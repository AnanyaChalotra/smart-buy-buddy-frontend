
import { useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onRefineSearch: (refinement: string) => void;
  isLoading: boolean;
  searchQuery: string;
}

export const ProductGrid = ({
  products,
  onProductSelect,
  onRefineSearch,
  isLoading,
  searchQuery
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<"relevance" | "price_low" | "price_high" | "rating">("relevance");
  
  const refinements = [
    "best budget options",
    "premium options",
    "highly rated options"
  ];

  // Sort products based on selected criteria
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // relevance (default order)
    }
  });

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            <div className="h-7 w-40 bg-gray-200 animate-pulse-light rounded"></div>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="h-40 bg-gray-200 animate-pulse-light rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 animate-pulse-light rounded mb-2 w-3/4"></div>
              <div className="h-5 bg-gray-200 animate-pulse-light rounded mb-2 w-1/4"></div>
              <div className="h-5 bg-gray-200 animate-pulse-light rounded mb-2 w-2/4"></div>
              <div className="h-9 bg-gray-200 animate-pulse-light rounded mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center mt-8 p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Search size={24} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-gray-500 mb-4">We couldn't find any products matching "{searchQuery}"</p>
        <Button variant="outline" onClick={() => onRefineSearch("something else")}>
          Try a different search
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg font-medium">
          Results for "{searchQuery}" <span className="text-gray-500">({products.length})</span>
        </h2>
        <div className="flex items-center text-sm">
          <span className="mr-2 text-gray-500">Sort by:</span>
          <select
            className="bg-white border border-gray-200 rounded-md px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Refinement suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-gray-500 py-1">Refine:</span>
        {refinements.map((refinement) => (
          <Button
            key={refinement}
            variant="outline"
            size="sm"
            onClick={() => onRefineSearch(refinement)}
            className="text-xs"
          >
            {refinement}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-contain" 
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant={product.source === "Amazon" ? "default" : "secondary"}
        >
          {product.source}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span className="text-sm">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-lg font-bold">${product.price}</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-shop-primary hover:bg-shop-secondary" 
          onClick={() => onSelect(product)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

// Import here because it's only used within this file
import { Search } from "lucide-react";
