import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';

export default function Product(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // const _slice = props.product.slice(0, show);
  // console.log('slice', _slice);

  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

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
    // if (state.userInfo) {
    toast.success(`${item.name} Added to the cart`);
    // }
    // else {
    //   navigate('/signin');
    // }
  };
  const discountPrice =
    props.product.price - props.product.productDiscountedPrice;
  const percentage = Math.floor(
    (props.product.productDiscountedPrice / props.product.price) * 100
  );
  console.log(userInfo);
  return (
    <Card
      style={{
        width: '250px',
        height: '300px',
        margin: '2px',
      }}
    >
      <Link to={`/product/${props.product.slug}`} style={{ height: '50%' }}>
        <img
          src={props.product.image}
          className="card-img-top"
          alt={props.product.name}
          style={{ height: '100%', objectFit: 'contain' }}
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
            color: 'green',
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
            </span>{' '}
            &nbsp; &nbsp;
            <span
              style={{
                margin: 'auto',
                // background: '#dc3545',
                color: 'green',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              {percentage}% OFF
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
