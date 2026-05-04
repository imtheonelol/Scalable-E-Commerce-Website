const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const cartService = {
  async getCart() {
    const response = await fetch(`${API_URL}/cart`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(productId: number, quantity: number = 1) {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async removeFromCart(cartItemId: number) {
    const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },
  
  async clearCart() {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  }
};