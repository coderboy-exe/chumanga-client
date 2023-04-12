import React, { createContext, useReducer } from 'react'

interface CartProps {
    children: React.ReactNode
}
interface CartContextValue {
    items: CartProps[];
    addToCart: (product: CartProps) => void;
    removeFromCart: (id: number) => void;
}
interface CartState {
    items: Array<any>
}
interface CartAction {
    type: string;
    payload: {
        items: Array<any>;
    };
} 


export const CartContext = createContext<CartContextValue>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
})
  
const cartReducer = (state: CartState, action: CartAction) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD":
            return {
                ...state,
                items: payload.items,
            };
        case "REMOVE":
            return {
                ...state,
                items: payload.items,
            };
    
        default:
            throw new Error("No case for that type");
    }
}


export const CartProvider = ({ children }: CartProps) => {

    const [state, dispatch] = useReducer(cartReducer, { items: [] })

    const addToCart = (product: CartProps) => {
        const updatedCart = [...state.items, product];

        dispatch({
            type: "ADD",
            payload: {
                items: updatedCart,
            },
        });
    };
    const removeFromCart = (id: number) => {
        const updatedCart = state.items.filter(
            (currentProduct) => currentProduct.id !== id);

        dispatch({
            type: "REMOVE",
            payload: {
                items: updatedCart,
            },
        });
    };

    const value: CartContextValue = {
        items: state.items,
        addToCart,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={ value }>
            { children }
        </CartContext.Provider>
    )
}