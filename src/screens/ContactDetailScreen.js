import React, { useContext, useReducer, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Axios } from 'axios';
import swal from 'sweetalert';
import { getError } from '../utils';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function ContactDetailScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const {
    fullBox,
    userInfo,
    cart: { contactDetails },
  } = state;
  console.log(state.cart);
  const [phoneNumber, setPhoneNumber] = useState(
    contactDetails.phoneNumber || ''
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    contactDetails.watsappNumber || ''
  );
  const [iMessageNumber, setIMessageNumber] = useState(
    contactDetails.iMessageNumber || ''
  );
  const [telegramNumber, setTelegramNumber] = useState(
    contactDetails.telegramNumber || ''
  );
  const [email, setEmail] = useState(contactDetails.email || '');
  console.log('state in contact details::', state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    // console.log('in onsubmit:::', data);
    ctxDispatch({
      type: 'SAVE_CONTACT_DETAILS',
      payload: {
        phoneNumber,
        whatsappNumber,
        iMessageNumber,
        telegramNumber,
        email,
      },
    });
    localStorage.setItem(
      'contactDetails',
      JSON.stringify({
        phoneNumber,
        whatsappNumber,
        iMessageNumber,
        telegramNumber,
        email,
      })
    );

    navigate('/placeorder');
  };

  return (
    <div className="container small-container">
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <h1 className="my-3">Contact Details</h1>
      <Form>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>
            Phone Number{' '}
            <span className="required" style={{ color: 'red' }}>
              *
            </span>
          </Form.Label>
          <Form.Control
            value={phoneNumber}
            type="number"
            maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        {errors.phoneNumber && (
          <p style={{ color: 'red' }}>Please check the Phone Number</p>
        )}
        <Form.Group className="mb-3" controlId="whatsappNumber">
          <Form.Label>whatsapp Number</Form.Label>
          <Form.Control
            value={whatsappNumber}
            type="number"
            maxLength={10}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Field style={{ display: 'grid' }}>
          <label style={{ fontSize: '17px' }}>Telegram Number</label>
          <input
            placeholder="Telegram Number"
            type="number"
            {...register('telegramNumber', {
              required: false,
              maxLength: 10,
            })}
          />
        </Form.Field> */}
        {errors.telegramNumber && (
          <p style={{ color: 'red' }}>Please check the Telegram Number</p>
        )}
        <Form.Group className="mb-3" controlId="iMessageNumber">
          <Form.Label>iMessage Number</Form.Label>
          <Form.Control
            value={iMessageNumber}
            type="number"
            maxLength={10}
            onChange={(e) => setIMessageNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telegramNumber">
          <Form.Label>Telegram Number</Form.Label>
          <Form.Control
            value={telegramNumber}
            type="number"
            maxLength={10}
            onChange={(e) => setTelegramNumber(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Field style={{ display: 'grid', marginTop: '5px' }}>
          <label style={{ fontSize: '17px' }}>Watsapp Number</label>
          <input
            placeholder="Watsapp Number"
            type="number"
            {...register('watsappNumber', {
              required: false,
              maxLength: 10,
            })}
          />
        </Form.Field> */}
        {errors.telegramNumber && (
          <p style={{ color: 'red' }}>Please check the Watsapp Number</p>
        )}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>
            Email{' '}
            <span className="required" style={{ color: 'red' }}>
              *
            </span>
          </Form.Label>
          <Form.Control
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {/* <Form.Field style={{ display: 'grid' }}>
          <label style={{ fontSize: '17px' }}>Email</label>
          <input
            placeholder="Email"
            type="email"
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </Form.Field> */}
        {errors.email && <p style={{ color: 'red' }}>Please check the Email</p>}

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
