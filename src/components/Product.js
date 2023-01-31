import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';

export default function Product(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === props.product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success(`${item.name} Added to the cart`);
  };
  const discountPrice =
    props.product.price - props.product.productDiscountedPrice;
  const percentage = Math.floor(
    (props.product.productDiscountedPrice / props.product.price) * 100
  );
  // console.log('in side product', state.userInfo?.isAdmin);
  return (
    //   <div
    //     class="product col-sm-4"
    //     style={{
    //       margin: '0px',
    //       background: '#f8f9fa',
    //       width: '100%',
    //       height: '85%',
    //     }}
    //   >
    //     <div class="inside">
    //       <div class="product_img" style={{ height: '60%', objectFit: 'cover' }}>
    //         <a href={`/product/${props.product.slug}`}>
    //           <img src={props.product.image} alt={props.product.name} />
    //         </a>
    //       </div>

    //       <div class="product_name">
    //         <a href={`/product/${props.product.slug}`}>{props.product.name}</a>
    //       </div>

    //       <div class="product_price">
    //         <Rating
    //           rating={props.product.rating}
    //           numReviews={props.product.numReviews}
    //         />
    //         <span style={{ fontSize: '15px' }}>Rs.{discountPrice}</span>
    //         <span style={{ textDecoration: 'line-through', margin: '10px' }}>
    //           {' '}
    //           Rs.{props.product.price}
    //         </span>
    //         <span
    //           style={{ margin: 'auto', background: '#dc3545', color: 'white' }}
    //         >
    //           ({percentage}% off)
    //         </span>
    //       </div>

    //       <div class="product_links">
    //         <form method="post" action="/cart/add">
    //           <input type="hidden" name="id" value="674918293" />

    //           {props.product.countInStock === 0 ? (
    //             state?.userInfo?.isAdmin ? null : (
    //               <Button variant="light" disabled>
    //                 Out of stock
    //               </Button>
    //             )
    //           ) : state?.userInfo?.isAdmin ? null : (
    //             <Button onClick={() => addToCartHandler(props.product)}>
    //               Add to cart
    //             </Button>
    //           )}
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // );
    // {
    <Card
      style={{
        width: '250px',
        height: '300px',
        margin: '2px',
      }}
    >
      <Link to={`/product/${props.product.slug}`} style={{ height: '150px' }}>
        <img
          src={props.product.image}
          className="card-img-top"
          alt={props.product.name}
          style={{ height: '100%' }}
        />
      </Link>
      <div style={{ textAlign: 'center', padding: '5px', overflow: 'overlay' }}>
        <Link
          to={`/product/${props.product.slug}`}
          style={{
            fontSize: '15px',
            display: 'block',
            overflow: 'hidden',
            textDecoration: 'none',
          }}
        >
          <span>{props.product.name}</span>
        </Link>
        <Rating
          rating={props.product.rating}
          numReviews={props.product.numReviews}
        />
        <Card.Text>
          <div>
            <span style={{ fontSize: '20px' }}>
              <b>Rs.{discountPrice}</b>
            </span>
            <span
              style={{
                textDecoration: 'line-through',
                margin: '10px',
              }}
            >
              {' '}
              Rs.{props.product.price}
            </span>
            <span
              style={{
                margin: 'auto',
                background: '#dc3545',
                color: 'white',
              }}
            >
              ({percentage}% off)
            </span>
          </div>
        </Card.Text>
        {props.product.countInStock === 0 ? (
          state?.userInfo?.isAdmin ? null : (
            <Button variant="light" disabled>
              <span
                style={{
                  height: '25px',
                  itemAlign: 'center',
                  padding: '2px',
                }}
              >
                {' '}
                Out of stock
              </span>
            </Button>
          )
        ) : state?.userInfo?.isAdmin ? null : (
          <Button onClick={() => addToCartHandler(props.product)}>
            <span
              style={{
                height: '25px',
                itemAlign: 'center',
                padding: '2px',
              }}
            >
              Add to cart
            </span>
          </Button>
        )}
      </div>
    </Card>
  );
}
