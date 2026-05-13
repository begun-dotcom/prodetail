import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { Services } from '../../services/Services';
import { data } from 'react-router-dom';

function UseAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('token');
        console.log("token in useauth", token)
        
        if (!token) {
          setLoading(false);
          setIsAuthenticated(false);
          setUser(null);
          console.log("токен отсутствует!")
          return;
        }

        
        try {
          const response = await Services.verify(token)
              if (response.status === 200) {
                const data = await response.data
                setIsAuthenticated(true);
                setUser(data.user.role)
                
              } else {
                console.log("Токен не валиден после проверки в verify");
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
              }
        } catch (error) {
          console.error('Auth error:', error);
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setLoading(false);
        }
  }, []);

    const login = async (username, password) => {
        try {
            const response = await Services.auth(username, password);
            if (response.status === 200) {
                const data = response.data
                const token = data.token;
                localStorage.setItem('token', token);
                setIsAuthenticated(true);
                setUser(data.role);
                return {success: true, result: data};
            } else {
                // Ошибка от сервера
                return { 
                    success: false, 
                    error: response.data?.detail || 'Ошибка авторизации' 
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: error.response?.data?.detail || error.message || 'Ошибка соединения' 
            };
        }
};

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  

  return { isAuthenticated, user, loading, login, logout, checkAuth };

}

export default UseAuth
