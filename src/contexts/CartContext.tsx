import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  sellingPrice?: number;
  quantity: number;
  image?: string;
  pv?: number;
  bv?: number;
  rp?: number;
  firstPurchaseBV?: number;
  firstPurchaseRP?: number;
  repurchaseSellingPrice?: number;
  inStock: boolean;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  totalPV: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  totalPV: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Convert productId to string for reliable comparison
      const payloadProductId = String(action.payload.productId);
      const existingItem = state.items.find(item => String(item.productId) === payloadProductId);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          String(item.productId) === payloadProductId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Ensure productId is stored as string
        const newItem = {
          ...action.payload,
          productId: payloadProductId
        };
        newItems = [...state.items, newItem];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case 'REMOVE_ITEM': {
      // Convert both to strings for reliable comparison
      const payloadId = String(action.payload);
      const newItems = state.items.filter(item => String(item.productId) !== payloadId);
      console.log('[CartReducer] REMOVE_ITEM:', {
        payloadId,
        itemsBefore: state.items.length,
        itemsAfter: newItems.length,
        removedItem: state.items.find(item => String(item.productId) === payloadId)
      });
      return calculateTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      // Convert productId to string for reliable comparison
      const payloadProductId = String(action.payload.productId);
      const newItems = state.items.map(item =>
        String(item.productId) === payloadProductId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      return calculateTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      return calculateTotals({ ...state, items: action.payload });

    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = state.items.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);
  const totalPV = state.items.reduce((sum, item) => sum + ((item.pv || 0) * item.quantity), 0);

  return {
    ...state,
    totalItems,
    totalAmount,
    totalPV,
  };
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('byoliva_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('byoliva_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // Stock check commented out temporarily
    // if (!item.inStock) {
    //   toast.error('Product is out of stock');
    //   return;
    // }

    const cartItem: CartItem = {
      ...item,
      quantity: item.quantity || 1,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success(`${item.name} added to cart`);
  };

  const removeItem = (productId: string) => {
    if (!productId) {
      console.error('[removeItem] Invalid productId:', productId);
      toast.error('Unable to remove item: Invalid product ID');
      return;
    }
    
    // Convert to string for comparison
    const productIdStr = String(productId);
    
    // Debug: Log current cart state
    console.log('[removeItem] Called with productId:', productIdStr);
    console.log('[removeItem] Current cart items:', state.items.map(item => ({
      productId: item.productId,
      productIdType: typeof item.productId,
      name: item.name
    })));
    
    const itemToRemove = state.items.find(item => String(item.productId) === productIdStr);
    
    if (!itemToRemove) {
      console.warn('[removeItem] Item not found in cart:', {
        searchedId: productIdStr,
        availableIds: state.items.map(item => String(item.productId))
      });
      toast.error('Item not found in cart');
      return;
    }
    
    console.log('[removeItem] Removing item:', itemToRemove.name);
    dispatch({ type: 'REMOVE_ITEM', payload: productIdStr });
    toast.success(`${itemToRemove.name} removed from cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
