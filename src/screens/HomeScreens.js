import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Slider from '../components/SliderScreens/Slider';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
// import { LeftArrow, RightArrow } from '../components/arrows';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreens() {
  const { getInitialValues, state, dispatch: ctxDispatch } = useContext(Store);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {}, []);

  useEffect(() => {
    let items =
      localStorage.getItem('userInfo') &&
      localStorage.getItem(
        `${JSON.parse(localStorage.getItem('userInfo'))._id}`
      )
        ? JSON.parse(
            localStorage.getItem(
              `${JSON.parse(localStorage.getItem('userInfo'))._id}`
            )
          )
        : [];

    ctxDispatch({
      type: 'INITIAL_STATE',
      payload: { items },
    });
  }, [ctxDispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  // console.log('pro', products);
  return (
    <div>
      <Helmet>
        <title>Nutrition supplements</title>
      </Helmet>
      <div style={{ marginBotton: '20px', width: '100%' }}>
        <Slider />
      </div>

      <>
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            // <ScrollMenu
            //   // Header={<div>HEADER</div>}
            //   // Footer={<div>FOOTER</div>}
            //   LeftArrow={LeftArrow}
            //   RightArrow={RightArrow}
            //   // onWheel={onWheel}
            // >
            <Row className="justify-content-evenly">
              {products?.map((product) => {
                return (
                  <Col
                    key={product.slug}
                    sm={6}
                    md={4}
                    lg={4}
                    className="md-3"
                    style={{
                      paddingBottom: '10px',
                      // maxWidth: '600px',
                      display: 'flex',
                      scroll: 'none',
                      // scrollX: 'none',
                    }}
                  >
                    <Product product={product} />

                    {/* <HorizontalScroll> */}

                    {/* </HorizontalScroll> */}
                  </Col>
                );
              })}
            </Row>
            // </ScrollMenu>
          )}
        </div>
      </>
    </div>
  );
}
