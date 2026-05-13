import React from 'react'
import axios from 'axios';


export const Services = {
    async verify(token) {
    try {
        const response = await axios.get(`/api/admin/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.status === 200) {
            console.log("✅ Токен валиден");
            return response;
        }
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("⚠️ Токен невалиден или просрочен");
            // Можно удалить токен из localStorage
            localStorage.removeItem('token');
        } else {
            console.error('Ошибка верификации:', error.message);
        }
        throw error;
    }
},
    async auth(username, password) {
        try {
            const response = await axios.post(`/api/admin/login`, {
                username: username,   
                password: password
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            return response;  // для axios данные в .data
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            throw error;
        }
    },

    async addProduct(token, formData ) {
        
    try {
        const response = await axios.post(`/api/admin/products`, 
                formData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}` // ✅ НЕ указываем Content-Type для FormData!
                }
            }
        );
        return response; // данные в response.data
    } catch (error) {
        console.error('Ошибка добавления продукта:', error);
        throw error;
    }
},
    async getCategory() {
            
        try {
            const response = await axios.get(`/api/admin/category`);
            return response; // данные в response.data
        } catch (error) {
            console.error('Ошибка получения категории:', error);
            throw error;
        }
    },

    async getCategoryByName(name) {
            
        try {
            const response = await axios.get(`/api/admin/category/${name}`);
            return response; // данные в response.data
        } catch (error) {
            console.error('Ошибка получения категории по имени:', error);
            throw error;
        }
    },


    async deleteProduct(productId, token) {
    try {
        const response = await axios.delete(`/api/admin/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Ошибка удаления продукта:', error);
        throw error;
    }
},
    async updateProduct(productId, formData) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`/api/admin/products/${productId}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Ошибка обновления продукта:', error);
        throw error;
    }
},


    async getContentForPage(page, limit, category) {
        try {
            const content = await axios.get(`/api/product_page?page=${page}&limit=${limit}&category=${category}`)
            return content
        } catch (error) {
        console.error('Ошибка получения страницы продукта:', error);
        throw error;
    }
        
    },

    

        
}