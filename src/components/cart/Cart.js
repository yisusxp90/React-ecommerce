import React, {Fragment, useState, useEffect} from 'react';
import './Cart.scss';
import { Button } from 'react-bootstrap';
import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Gargabe } from '../../assets/svg/garbage.svg';
import { BASE_PATH, STORAGE_PRODUCTS_CART } from "../../utils/Constants";
import {countDuplicatesItemArray, removeArrayDuplicates, removeItemArray} from "../../utils/ArrayFunc";

const Cart = (props) => {

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const { productsCart, getProductsCart, products } = props;
    const [singleProductsCart, setSingleProductsCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = "scroll";
    };

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
    };

    const increaseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
        getProductsCart();
    };

    const decreaseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS_CART, result);
        getProductsCart();
    };

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingleProductsCart(allProductsId);
    }, [productsCart]);

    useEffect(() => {
        const productData = [];
        let totalPrice = 0;
        const allProductsId = removeArrayDuplicates(productsCart);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesItemArray(productId, productsCart);
            const productVaue = {
                id: productId,
                quantity: quantity
            };
            productData.push(productVaue);
        });
        if(!products.loading && products.result){
            products.result.forEach(product => {
                productData.forEach(item => {
                    if(product.id.toString() === item.id){
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;
                    }
                });
            });
        }
        setCartTotalPrice(totalPrice);
    }, [productsCart, products]);

    return (
        <Fragment>
            <Button variant="link" className="cart">
                {
                    productsCart.length > 0 ?
                        (
                        <CartFull onClick={openCart}/>
                        ) :
                        (
                        <CartEmpty onClick={openCart}/>
                        )
                }

            </Button>
            <div className="cart-content" style={{width: widthCartContent}}>
                <CartContentHeader
                    closeCart={closeCart}
                    emptyCart={emptyCart}
                />

                <div className="cart-content__products">
                    {singleProductsCart.map((idProductCart, index) => (
                        <CartContentProducts
                            key={index}
                            producto={products}
                            idsProductsCart={productsCart}
                            idProductCart={idProductCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                    ))}
                </div>
                <CartContentFooter
                    cartTotalPrice={cartTotalPrice}
                />
            </div>
        </Fragment>

    );
};

export default Cart;


const CartContentHeader = (props) => {
    const { closeCart, emptyCart } = props;

    return (

        <div className="cart-content-header">
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>

            <Button variant="link" onClick={emptyCart}>
                Vaciar
                <Gargabe />
            </Button>
        </div>
    );
};

const CartContentProducts = (props) => {

    const { idsProductsCart, idProductCart, increaseQuantity, decreaseQuantity} = props;
    const producto = props.producto;
    if(!producto.loading && producto.result) {
        return producto.result.map((product, index) => {
            if (idProductCart.toString() === product.id.toString()) {
                const quantity = countDuplicatesItemArray(product.id.toString(), idsProductsCart);
                return (
                    <RenderProduct
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                );
            }
        });
    }
    return null;

};


const RenderProduct = (props) => {
    const { product, quantity, increaseQuantity, decreaseQuantity } = props;
    return (

        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)} ....</h3>
                    <p>{product.price.toFixed(2)} €/Unidad</p>
                </div>
                <div>
                    <p>En carro: {quantity} Unidad.</p>
                    <div>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartContentFooter = (props) => {
    const { cartTotalPrice } = props;
    return (
        <div className="cart-content__footer">
            <div>
                <p>Total Aproximado: </p>
                <p>{cartTotalPrice.toFixed(2)} €</p>
            </div>
            <Button>Tramitar pedido</Button>
        </div>
    );
};