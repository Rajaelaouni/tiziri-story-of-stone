import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data.products";
type Item={id:string;quantity:number};
type CartValue={items:Item[]; count:number; total:number; add:(id:string,q?:number)=>void; remove:(id:string)=>void; setQuantity:(id:string,q:number)=>void; clear:()=>void};
const CartContext=createContext<CartValue|undefined>(undefined);
export function CartProvider({children}:{children:ReactNode}){
 const [items,setItems]=useState<Item[]>([]); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem("tiziri-cart");if(raw)setItems(JSON.parse(raw));}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("tiziri-cart",JSON.stringify(items))},[items,ready]);
 const value=useMemo(()=>({items,count:items.reduce((s,i)=>s+i.quantity,0),total:items.reduce((s,i)=>s+(products.find(p=>p.id===i.id)?.price??0)*i.quantity,0),add:(id:string,q=1)=>setItems(a=>a.some(i=>i.id===id)?a.map(i=>i.id===id?{...i,quantity:i.quantity+q}:i):[...a,{id,quantity:q}]),remove:(id:string)=>setItems(a=>a.filter(i=>i.id!==id)),setQuantity:(id:string,q:number)=>setItems(a=>q<1?a.filter(i=>i.id!==id):a.map(i=>i.id===id?{...i,quantity:q}:i)),clear:()=>setItems([])}),[items]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error("CartProvider missing");return c}
