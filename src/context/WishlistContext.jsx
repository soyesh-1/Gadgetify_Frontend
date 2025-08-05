import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

const API_URL = 'http://localhost:5005/api/users/wishlist';

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user?.token) {
        try {
          const res = await fetch(API_URL, {
            headers: { 'x-auth-token': user.token },
          });
          const data = await res.json();
          setWishlist(data);
        } catch (err) {
          console.error('Error fetching wishlist', err);
          setWishlist([]);
        } finally {
          setLoading(false);
        }
      } else {
        setWishlist([]);
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.token,
        },
        body: JSON.stringify({ productId: product._id }),
      });
      setWishlist((prev) => [...prev, product]);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': user.token },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const isItemInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, addToWishlist, removeFromWishlist, isItemInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};