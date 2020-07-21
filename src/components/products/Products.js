import React from 'react';
import './Products.scss';
import { Container, Row } from 'react-bootstrap';
import Loading from "../loading/Loading";
import Product from "../product/Product";

const Products = (props) => {
    const { products: { result, loading }, addProductCart } = props;

    return (
        <Container>
            <Row>
                {loading || !result ?
                    <Loading/> :

                    (
                        result.map((product, index) => (
                            <Product
                                key={product.id}
                                product={product}
                                index={index}
                                addProductCart={addProductCart}
                            />
                        ))
                    )
                }
            </Row>
        </Container>

    );
};

export default Products;