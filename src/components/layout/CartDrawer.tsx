"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useApp } from "./AppProviders";

export default function CartDrawer() {
  const { cart, cartTotal, cartOpen, setCartOpen, setQuantity, removeFromCart, clearCart } = useApp();

  return (
    <AnimatePresence>
      {cartOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm"
          onMouseDown={() => setCartOpen(false)}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-panel"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="eyebrow text-gold">Your bag</p>
                <h2 className="display mt-1 text-2xl text-white">Cart</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="text-cream/50 transition hover:text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length ? (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/10 pb-5">
                      <div className="relative size-20 shrink-0 overflow-hidden bg-black">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-gold">${item.price.toFixed(2)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-white/15">
                            <button type="button" onClick={() => setQuantity(item.id, item.qty - 1)} aria-label="Decrease quantity" className="px-2 py-1 text-cream/60 hover:text-white">
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-xs text-white">{item.qty}</span>
                            <button type="button" onClick={() => setQuantity(item.id, item.qty + 1)} aria-label="Increase quantity" className="px-2 py-1 text-cream/60 hover:text-white">
                              <Plus size={13} />
                            </button>
                          </div>
                          <button type="button" onClick={() => removeFromCart(item.id)} aria-label="Remove item" className="text-cream/35 transition hover:text-red-400">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={36} className="text-cream/20" />
                  <p className="display mt-5 text-2xl text-white">Your cart is empty</p>
                  <p className="mt-2 max-w-xs text-sm text-cream/45">Explore the official AEW collection and add something worthy of the Universe.</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-cream/50">Subtotal</span>
                <span className="display text-2xl text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-[11px] text-cream/35">Demo cart only — no payment is processed.</p>
              <button type="button" disabled={!cart.length} className="btn-gold mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40">
                Continue to checkout
              </button>
              {cart.length ? (
                <button type="button" onClick={clearCart} className="mt-3 w-full text-center text-xs uppercase tracking-widest text-cream/40 hover:text-white">
                  Clear cart
                </button>
              ) : null}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
