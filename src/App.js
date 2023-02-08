import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions';
let init = true
function App() {

  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
    console.log('fected');
  }, [dispatch])

  useEffect(() => {
    if (init) {
      init = false
      return
    }

    if (cart.changed) {
      console.log("sending");
      dispatch(sendCartData(cart))//dont create in firebase
    }
  }, [cart, dispatch])

  console.log(notification);
  return (
    <>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
