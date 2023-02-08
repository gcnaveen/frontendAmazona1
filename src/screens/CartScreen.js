import { useContext, useState } from 'react';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ContactDetailScreen from './ContactDetailScreen';

export default function CartScreen() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [modal, setModal] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    // return (
    //   <Modal>
    //     <ModalHeader>Contact Details</ModalHeader>
    //   </Modal>
    // );
    // navigate('/shipping');
    state.userInfo ? navigate('/shipping') : setModal(!modal);
  };
  // let vl = cartItems.map((ele) => {
  //   return ele.quantity;
  // });

  console.log('cartItems:::', cartItems);
  // console.log('mukli hadri', vl);
  const handleChange = (item, val) => {
    // console.log('in side change::', vl, method);

    if (val === '') {
      updateCartHandler(item, 1);
    } else if (val === '10') {
      updateCartHandler(item, 10);
    } else if (val === '50') {
      updateCartHandler(item, 50);
    } else if (val === '100') {
      updateCartHandler(item, 100);
    } else if (val === '180') {
      updateCartHandler(item, 180);
    } else if (val === '150') {
      updateCartHandler(item, 150);
    } else {
      updateCartHandler(item, 1);
    }
  };
  console.log(cartItems);
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div>
        <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader toggle={() => setModal(!modal)}>
            Contact Details
          </ModalHeader>
          <ModalBody>
            <ContactDetailScreen />
          </ModalBody>
        </Modal>
      </div>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} style={{ color: 'black' }}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => {
                          // let qnty = quantity + 1;
                          updateCartHandler(item, item.quantity - 1);
                        }}
                        variant="light"
                        disabled={quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>Rs.{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>

                      <div>
                        <select
                          defaultValue=""
                          onChange={(e) => handleChange(item, e.target.value)}
                        >
                          <option value="">quantity</option>
                          <option value="10">10</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                          <option value="180">180</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : Rs.
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={checkoutHandler}
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
