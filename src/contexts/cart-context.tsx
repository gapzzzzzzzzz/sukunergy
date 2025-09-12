'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image?: string;
  weight?: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.item.id);
      const quantity = action.item.quantity || 1;
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > existingItem.maxStock) {
          toast({
            title: 'Stok tidak mencukupi',
            description: `Maksimal ${existingItem.maxStock} item untuk ${existingItem.productName} ${existingItem.variantName}`,
            variant: 'destructive',
          });
          return state;
        }
        
        const updatedItems = state.items.map(item =>
          item.id === action.item.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      } else {
        if (quantity > action.item.maxStock) {
          toast({
            title: 'Stok tidak mencukupi',
            description: `Maksimal ${action.item.maxStock} item untuk ${action.item.productName} ${action.item.variantName}`,
            variant: 'destructive',
          });
          return state;
        }
        
        const newItem: CartItem = { ...action.item, quantity };
        const updatedItems = [...state.items, newItem];
        
        toast({
          title: 'Produk ditambahkan',
          description: `${newItem.productName} ${newItem.variantName} ditambahkan ke keranjang`,
          variant: 'success',
        });
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.id);
      
      toast({
        title: 'Produk dihapus',
        description: 'Produk berhasil dihapus dari keranjang',
        variant: 'info',
      });
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', id: action.id });
      }
      
      const item = state.items.find(item => item.id === action.id);
      if (!item) return state;
      
      if (action.quantity > item.maxStock) {
        toast({
          title: 'Stok tidak mencukupi',
          description: `Maksimal ${item.maxStock} item untuk ${item.productName} ${item.variantName}`,
          variant: 'destructive',
        });
        return state;
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.id
          ? { ...item, quantity: action.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'CLEAR_CART':
      toast({
        title: 'Keranjang dikosongkan',
        description: 'Semua produk berhasil dihapus dari keranjang',
        variant: 'info',
      });
      
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    case 'LOAD_CART': {
      return {
        items: action.items,
        total: action.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: action.items.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string) => boolean;
  getCartItem: (productId: string, variantId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sukunergy_cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', items });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sukunergy_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: string, variantId: string) => {
    return state.items.some(item => item.productId === productId && item.variantId === variantId);
  };

  const getCartItem = (productId: string, variantId: string) => {
    return state.items.find(item => item.productId === productId && item.variantId === variantId);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getCartItem,
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
