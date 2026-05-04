const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const productService = {
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProductById(id: string | number) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    category_id: number;
    imageFile?: File; // Local upload
    imageLink?: string; // External link
  }) {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('category_id', productData.category_id.toString());
    
    if (productData.imageFile) {
      formData.append('imageFile', productData.imageFile);
    } else if (productData.imageLink) {
      formData.append('imageLink', productData.imageLink);
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData, 
    });

    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }
};