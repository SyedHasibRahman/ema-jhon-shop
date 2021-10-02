import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewIteam from '../ReviewIteam/ReviewIteam';
import { useHistory } from 'react-router'

const OrderReview = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }
    const handlePlaceOrder = () => {
        history.push('/PlaceOrder');
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewIteam
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewIteam>)
                }

            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}>
                    {/* <Link to="/PlaceOrder"> */}
                    <button onClick={handlePlaceOrder}>Place Order</button>
                    {/* </Link> */}
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;
