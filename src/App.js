import React, { useEffect, useState } from 'react';
import TopMenu from "./components/topMenu/TopMenu";
import useFetch from "./hooks/useFetch";
import { STORAGE_PRODUCTS_CART, URL_API } from "./utils/Constants";
import data from "./db/dbproducts";
import Products from "./components/products/Products";
import { ToastContainer, toast } from 'react-toastify';

function App() {

    // const result = useFetch(URL_API);
    const [productsCart, setProductsCart] = useState([]);

    const getProductsCart = () => {
        const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
        if(idsProducts){
            const idsProductsSplit = idsProducts.split(',');
            setProductsCart(idsProductsSplit);
        }else{
            setProductsCart([]);
        }
    };

    const products = data;

    const addProductCart = (idProducto, nombreProducto) => {
        const idsProducts = productsCart;
        idsProducts.push(idProducto);
        setProductsCart(idsProducts);
        localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
        getProductsCart();
        toast.success(`${nombreProducto} ha sido añadido correctamente.`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };
    useEffect(() => {
        // recuperamos del localStorage al recargar la pagina para que no se borre el contenido
        getProductsCart();
    }, []);

    return (
        <div>
            <TopMenu
                productsCart={productsCart}
                getProductsCart={getProductsCart}
                products={products}
            />
            <Products
                products={products}
                addProductCart={addProductCart}
            />
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />

        </div>
    );
}

export default App;
