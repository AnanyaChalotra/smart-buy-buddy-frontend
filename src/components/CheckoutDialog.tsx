
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CheckoutDialog = ({ open, product, onConfirm, onCancel }: CheckoutDialogProps) => {
  if (!product) return null;
  
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Complete your purchase</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to purchase the following item:
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex items-start py-4">
          <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 mr-4">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-contain p-2" 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
            <p className="text-sm text-gray-500 mb-2">From {product.source}</p>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                <span className="text-sm">{product.rating}</span>
              </div>
              <span className="text-lg font-bold ml-auto">${product.price}</span>
            </div>
            <p className="text-xs text-gray-500">
              This is a frontend demo. No actual purchase will be made.
            </p>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-shop-primary hover:bg-shop-secondary" 
            onClick={onConfirm}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Confirm Purchase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
