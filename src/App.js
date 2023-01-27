import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  // useNavigation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
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
// import Button from 'react-bootstrap/Button';
// import { getError } from './utils';
import axios from 'axios';
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
// import { NavItem } from 'react-bootstrap';
import CreateSlide from './components/SliderScreens/CreateSlide';
import CategoryWiseProductList from './screens/CategoryWiseProductList';
import { NavLink } from 'react-router-dom';
import SubMenuComp from './components/Sidebar/SubMenu';
import CreateProduct from './screens/CreateProduct';
import CreateCateogry from './screens/CreateCateogry';

function App() {
  const {
    state,
    dispatch: ctxDispatch,
    // getInitialValues
  } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    // localStorage.removeItem('cartItems');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/getAllCats');
        setCategories(data);
        console.log('data', data);
      } catch (err) {
        console.log('network error', err);
        // toast.error(getError(err));
      }
    };

    fetchCategories();
  }, [state]);

  console.log('categories', JSON.stringify(categories));

  return (
    <BrowserRouter>
      <div
        className="site-container d-flex flex-column"
        // style={{ minWidth: '626px' }}
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header
          variant="dark"
          style={{ backgroundColor: '#2c2626' }}
          expand="lg"
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
              <Link
                to="#signout"
                style={{
                  marginRight: '160px',
                  marginTop: '25px',
                  textDecoration: 'none',
                  color: '#736a6a',
                  fontSize: '15px',
                  width: 'auto',
                }}
                onClick={signoutHandler}
              >
                Sign Out
              </Link>
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
              <Link
                to="/signin"
                style={{
                  marginRight: '160px',
                  marginTop: '25px',
                  textDecoration: 'none',
                  color: '#736a6a',
                  fontSize: '15px',
                  width: 'auto',
                }}
              >
                SignIn
              </Link>
            </span>
          )}

          <Navbar
            style={{
              paddingLeft: '40px',
              paddingBottom: '20px',
              width: 'auto',
              height: 'auto',
              maxWidth: '992px',
              // minWidth: '700px',
            }}
          >
            <img
              src="//cdn.shopify.com/s/files/1/0432/0609/t/3/assets/logo.png?v=3239645435533822301397117626"
              alt="Nutrition supplements"
            ></img>
            <LinkContainer to="/">
              <Navbar.Brand style={{ color: 'white' }}>
                <b className="titleHover">
                  <span
                    style={{
                      fontSize: '50px',
                      lineHeight: '50px',
                      marginTop: ' 10px',
                      display: 'block',
                      color: 'white',
                      fontWeight: 700,
                    }}
                  >
                    Nutrition
                  </span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: '-10px',
                      fontWeight: 100,
                      fontSize: ' 41px',
                      lineHeight: '41px',
                      color: '#736a6a',
                    }}
                  >
                    supplements
                  </span>
                </b>
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div
                style={{
                  alignItem: 'center',
                  paddingLeft: '100px',
                  width: '260x',
                }}
              >
                <SearchBox />
              </div>

              <Nav className="me-auto w-50  justify-content-end">
                {userInfo?.isAdmin ? null : (
                  <div
                    style={{
                      borderRadius: '10px',
                      background: '#75b510',
                      width: '120px',
                      height: '60px',
                      padding: '10px',
                      marginRight: '115px',
                    }}
                  >
                    {userInfo && userInfo.isAdmin ? null : userInfo === null ? (
                      <Link
                        to="/signin"
                        className="nav-link"
                        style={{ padding: '10px' }}
                      >
                        <i
                          className="fas fa-shopping-cart"
                          style={{ color: 'white' }}
                        ></i>
                        <span style={{ color: 'white', fontSize: '17px' }}>
                          {' '}
                          Cart
                        </span>
                      </Link>
                    ) : (
                      <Link
                        to="/cart"
                        className="nav-link"
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
                        {cart.cartItems.length > 0 &&
                          (userInfo ? (
                            <Badge pill bg="danger">
                              {cart.cartItems.reduce(
                                (a, c) => a + c.quantity,
                                0
                              )}
                            </Badge>
                          ) : null)}
                      </Link>
                    )}
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            <Navbar
              style={{
                maxWidth: '1000px',
                position: 'relative',
                zIndex: 99,
                borderTop: ' 1px solid #534b4b',
                background:
                  'linear-gradient(to bottom,#3f3737 0%,#2e2727 100%)',
                margin: 'auto',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  color: 'white',
                  paddingLeft: '5px',
                  borderRadius: '6px',
                }}
              >
                CATEGORY
              </div>
              <div
                className="headerhover"
                style={{ marginLeft: 'auto', paddingRight: '20px' }}
              >
                {userInfo && userInfo?.isAdmin ? (
                  <div>
                    <Link className="header-link" to="/">
                      Home
                    </Link>
                    <Link className="header-link" to="/admin/dashboard">
                      Dashboard
                    </Link>
                    <Link className="header-link" to="/admin/products">
                      Products
                    </Link>
                    <Link className="header-link" to="/admin/sliders">
                      Sliders
                    </Link>
                    <Link className="header-link" to="/admin/orders">
                      Orders
                    </Link>
                    <Link className="header-link" to="/admin/users">
                      Users
                    </Link>
                    <Link className="header-link" to="/profile">
                      Admin Profile
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link className="header-link" to="/">
                      Home
                    </Link>
                    <Link className="header-link" to="/orderhistory">
                      Order History
                    </Link>
                    <Link className="header-link" to="/profile">
                      User Profile
                    </Link>
                  </div>
                )}
              </div>
            </Navbar>
          </div>
        </header>

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
            marginLeft: '88px',
            backgroundColor: '#85ca18;',
          }}
        >
          <div class="caregoryList" style={{ width: '25%' }}>
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
                  <ListGroup.Item key={category.slug}>
                    {category.name}
                  </ListGroup.Item>
                </NavLink>
              ))}
            </ListGroup>
            <div class="widget widget_banner" style={{ paddingTop: '30px' }}>
              <img
                src="//cdn.shopify.com/s/files/1/0432/0609/t/3/assets/custom_banner_img.jpg?v=109058294885636396901397135061"
                alt=""
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <Container
            className="mt-3"
            style={{
              marginRight: '77px',
              width: '65%',
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
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              {/* slide Route */}
              <Route
                path="/slider/:sliderID"
                element={
                  <ProtectedRoute>
                    <SlidingProducts />
                  </ProtectedRoute>
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
          </Container>
        </main>
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
