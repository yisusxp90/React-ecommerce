import React from 'react';
import './TopMenu.scss';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/img/original.svg';
import Cart from "../cart/Cart";

const TopMenu = (props) => {

    const { productsCart, getProductsCart, products } = props;

    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                <BrandNav />
                <Cart
                    productsCart={productsCart}
                    getProductsCart={getProductsCart}
                    products={products}
                />
            </Container>
        </Navbar>
    );
};

export default TopMenu;


const BrandNav = () => {
    return (
        <Navbar.Brand>
            <Logo/>
            <h2>La casa de los Helados</h2>
        </Navbar.Brand>
    );
};
