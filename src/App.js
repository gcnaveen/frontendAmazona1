import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import AddToCart from './screens/ContinueShopping';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import Footer from './components/Footer';
import SlidingProducts from './components/SliderScreens/SlidingProducts';
import SlideProductScreen from './components/SliderScreens/SlideProductScreen';
import SliderCartScreen from './components/SliderScreens/SliderCartScreen';
import SlideListScreen from './components/SliderScreens/SlideListScreen';
import SliderEditScreen from './components/SliderScreens/SliderEditScreen';
import EditShippingAdress from './screens/EditShippingAdress';
import CreateSlide from './components/SliderScreens/CreateSlide';
import CategoryWiseProductList from './screens/CategoryWiseProductList';
import { NavLink } from 'react-router-dom';
import SubMenuComp from './components/Sidebar/SubMenu';
import CreateProduct from './screens/CreateProduct';
import CreateCateogry from './screens/CreateCateogry';
import ContactDetailScreen from './screens/ContactDetailScreen';
import BlackFridaySale from './components/Black-friday-sale/BlackFridaySale';
import ViewAllProducts from './screens/ViewAllProducts';
import { getError } from './utils';
import SignUpInfo from './screens/SignUpInfo';

function App() {
  const {
    state,
    dispatch: ctxDispatch,
    // getInitialValues
  } = useContext(Store);
  const { cart, userInfo, fullBox } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItems');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  console.log(state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/getAllCats');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchCategories();
  }, [state]);

  let returnCategoryComponent = function () {
    let doc = document.getElementsByClassName('caregoryList');
    if (window.location.pathname === ('/signin' || '/signup')) {
      doc.classList?.add('hide');
    } else {
      doc.classList?.remove('hide');
    }
  };

  setTimeout(() => {
    returnCategoryComponent();
  }, 500);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        } // style={{ minWidth: '626px' }}
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            variant="dark"
            style={{
              backgroundColor: '#2c2626',
              display: 'block',
              padding: '20px',
            }}
            expand="lg"
          >
            <Container>
              <img
                src="//cdn.shopify.com/s/files/1/0432/0609/t/3/assets/logo.png?v=3239645435533822301397117626"
                alt="Nutrition supplements"
              ></img>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <div className="headerText">
                    <span className="headericon">RX</span>
                    <span className="subheadericon">
                      MEDICINE
                      <br height="0px" />
                      ONLINE
                    </span>
                  </div>
                </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <div
                  style={{
                    alignItem: 'center',
                    paddingLeft: '150px',
                    // width: '600px',
                  }}
                >
                  <SearchBox />
                </div>
                <Nav
                  className="me-auto  w-100  justify-content-end"
                  style={{ display: 'inline-grid' }}
                >
                  {userInfo ? (
                    <span
                      style={{
                        color: 'wheat',
                        display: 'flex',
                        flexDirection: ' row-reverse',
                        height: ' 30px',
                        width: 'auto',
                      }}
                    >
                      <a
                        href="#signout"
                        style={{
                          // marginRight: '160px',
                          marginTop: '5px',
                          textDecoration: 'none',
                          color: '#736a6a',
                          fontSize: '15px',
                          width: 'auto',
                          marginRight: '100px',
                        }}
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </a>
                    </span>
                  ) : (
                    <span
                      style={{
                        color: 'wheat',
                        display: 'flex',
                        flexDirection: ' row-reverse',
                        height: ' 30px',
                        width: 'auto',
                      }}
                    >
                      {' '}
                      <a
                        href="/signin"
                        style={{
                          // marginRight: '160px',
                          marginTop: '5px',
                          textDecoration: 'none',
                          color: '#736a6a',
                          fontSize: '15px',
                          width: 'auto',
                          marginRight: '100px',
                        }}
                      >
                        SignIn
                      </a>
                    </span>
                  )}

                  {userInfo?.isAdmin ? null : (
                    <div
                      style={{
                        borderRadius: '10px',
                        background: '#75b510',
                        width: '120px',
                        height: '60px',
                        padding: '17px',
                        marginRight: '60px',
                        marginTop: '10px',
                      }}
                    >
                      <a
                        href="/cart"
                        className="nav-a"
                        style={{ color: 'white' }}
                      >
                        <i
                          className="fas fa-shopping-cart"
                          style={{ color: 'white' }}
                        ></i>
                        <span style={{ color: 'white', fontSize: '17px' }}>
                          {' '}
                          Cart
                        </span>{' '}
                        {
                          cart.cartItems.length > 0 && (
                            // (userInfo ? (

                            <Badge pill bg="danger">
                              {cart.cartItems.reduce(
                                (a, c) => a + c.quantity,
                                0
                              )}
                            </Badge>
                          )
                          // ) : null)
                        }
                      </a>
                      {/* // )} */}
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div className="category-div">
          <div
            style={{
              // width: '100% !important',
              width: '80%',

              // maxWidth: '1000px',
              // position: 'relative',
              // zIndex: 99,
              // borderTop: ' 1px solid #534b4b',
              background: 'linear-gradient(to bottom,#3f3737 0%,#2e2727 100%)',
              // margin: 'auto',
              // borderRadius: '6px',
              display: 'flex',
              flexDirection: 'row-reverse',
              // marginTop: '30px',
              // border: '1px solid red',
            }}
          >
            <div
              className="headerhover"
              style={{
                height: '45px',
                /* margin-left: auto; */
                /* padding-right: 20px; */
                width: '100%',
                display: 'flex',
                flexDirection: 'row-reverse',
                paddingRight: '100px',
              }}
            >
              {userInfo && userInfo?.isAdmin ? (
                <div>
                  <a className="header-a" href="/">
                    Home
                  </a>
                  <a className="header-a" href="/admin/dashboard">
                    Dashboard
                  </a>
                  <a className="header-a" href="/admin/products">
                    Products
                  </a>
                  <a className="header-a" href="/admin/sliders">
                    Sliders
                  </a>
                  <a className="header-a" href="/admin/orders">
                    Orders
                  </a>
                  <a className="header-a" href="/admin/users">
                    Users
                  </a>
                  <a className="header-a" href="/profile">
                    Admin Profile
                  </a>
                </div>
              ) : (
                <div>
                  <a className="header-a" href="/">
                    Home
                  </a>
                  <a className="header-a" href="/orderhistory">
                    Order History
                  </a>
                  <a className="header-a" href="/profile">
                    User Profile
                  </a>
                  <a className="header-a" href="">
                    Contact Us
                  </a>
                  <a className="header-a" href="">
                    About Us
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            <div className="side-bar-nav">
              {categories.map((category, i) => (
                <SubMenuComp key={category.slug} category={category} />
              ))}
            </div>
          </Nav>
        </div>
        <main
          style={{
            display: 'flex',
            margin: '0 10%',
            // backgroundColor: '#85ca18;',
          }}
        >
          {/* {window.location.pathname === '/signin' ? null : ( */}

          <div
            class="caregoryList"
            style={{
              display:
                window.location.pathname === ('/signin' || '/signup')
                  ? 'none'
                  : '',
            }}
          >
            <div
              style={{
                color: 'white',
                background:
                  'linear-gradient(rgb(63, 55, 55) 0%, rgb(46, 39, 39) 100%)',
                textAlign: 'center',
                height: '45px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRight: '1px solid black',
                fontSize: '1.3rem',
                // fontFamily: 'serif',
                fontWeight: 400,
                // color: 'red',
                // height:
              }}
            >
              Categories
            </div>
            <ListGroup>
              {categories?.map((category, i) => (
                <NavLink
                  to={`/products/categories?type=category&name=${category.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '18px',
                  }}
                >
                  <ListGroup.Item
                    key={category.slug}
                    style={{ color: 'white' }}
                  >
                    {category.name}
                  </ListGroup.Item>
                </NavLink>
              ))}
              <div class="widget widget_banner" style={{ paddingTop: '30px' }}>
                <img
                  src="//cdn.shopify.com/s/files/1/0432/0609/t/3/assets/custom_banner_img.jpg?v=109058294885636396901397135061"
                  alt=""
                  style={{ width: '100%' }}
                />
              </div>
              {/* <div
                className="marketing-animation"
                style={{
                  width: '25%',
                  height: '50px',
                  border: '1px solid black',
                  position: 'fixed',
                  bottom: '1px',
                  left: '20px',
                  // transform: 'translate',
                  backgroundColor: 'lightblue',
                }}
              > */}
              {/* <marquee direction="up" scrollamount="1">
                  Multi has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="1">
                  Naveen has purchased $1099 worth products
                </marquee> */}
              {/* <marquee direction="up" scrollamount="20">
                  Shamanth has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="50">
                  Harshith has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="75">
                  Harsha has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="110">
                  Sangeetha has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="130">
                  Chida has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="150">
                  Rohith has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="170">
                  Nithan has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="200">
                  Mithun has purchased $1099 worth products
                </marquee>
                <marquee direction="up" scrollamount="220">
                  Mohan has purchased $1099 worth products
                </marquee> */}
              {/* </div> */}
            </ListGroup>
            {/* <div class="widget widget_banner" style={{ paddingTop: '30px' }}>
              <img
                src="//cdn.shopify.com/s/files/1/0432/0609/t/3/assets/custom_banner_img.jpg?v=109058294885636396901397135061"
                alt=""
                // style={{ paddingLeft: '182px' }}
              />
            </div> */}
            {/* <div
              className="bestseller"
              // style={{
              //   width: '100%',
              //   height: '300px',
              //   marginTop: '10px',
              //   border: '1px solid black',
              // }}
            >
              <BestSeller />
            </div> */}
          </div>
          {/* )} */}
          <Container
            className="mt-3"
            style={{
              // marginRight: '77px',
              width: '80%',
            }}
          >
            <Routes>
              <Route
                path="/products/categories"
                element={<CategoryWiseProductList />}
              />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/signup-info" element={<SignUpInfo />} />
              <Route
                path="/reset-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>{' '}
              <Route
                path="/adress-edit/:id"
                element={<EditShippingAdress />}
              ></Route>
              <Route path="/search" element={<SearchScreen />} />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/contact-detail"
                element={<ContactDetailScreen />}
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/add-to-cart" element={<AddToCart />}></Route>
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/allProducts" element={<ViewAllProducts />}></Route>
              {/* slide Route */}
              <Route
                path="/slider/:sliderID"
                element={
                  // <ProtectedRoute>
                  <SlidingProducts />
                  // </ProtectedRoute>
                }
              />
              <Route path="/carts" element={<SliderCartScreen />} />
              <Route path="/sliders/:slug" element={<SlideProductScreen />} />
              <Route
                path="/admin/sliders"
                element={
                  <AdminRoute>
                    <SlideListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/sliders/createSlide"
                element={
                  <AdminRoute>
                    <CreateSlide />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/sliders/:id"
                element={
                  <AdminRoute>
                    <SliderEditScreen />
                  </AdminRoute>
                }
              ></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/createCategory"
                element={
                  <AdminRoute>
                    <CreateCateogry />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/createProduct"
                element={
                  <AdminRoute>
                    <CreateProduct />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
            <div>
              <BlackFridaySale />
            </div>
          </Container>
          {/* <div ref={scrollTopRef} /> */}
          {/* <div
            style={{
              width: '100%',
              border: '1px solid',
            }}
          >
            {' '}
            Best Sellers{' '}
          </div> */}
          {/* <div>
            <BlackFridaySale />
          </div> */}
        </main>
        {/* <div
          style={{
            width: '100%',
            // border: '1px solid',
            alignItems: 'center',
            marginLeft: '200px',
          }}
        >
          <img
            src="https://www.seekpng.com/png/detail/62-621294_tom-ford-ft5401-020-clear-best-seller-banner.png"
            alt=""
          />
          
        </div> */}
        {/* <div style={{ marginBotton: '20px' }}> */}

        {/* </div> */}
        <footer>
          <div className="text-center " style={{ paddingTop: ' 10px' }}>
            <Footer />
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
