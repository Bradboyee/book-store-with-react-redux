import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData = () => {
    return  async dispatch => {
        const fetchData = async () => {
            const response = await fetch("https://react-sample-d0a66-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json")

            if (!response.ok) {
                throw new Error("cannot get data...")
            }
            const data = await response.json()

            return data
        }

        try {
            const cartData = await fetchData();
            dispatch(
              cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
              })
            );
          } catch (error) {
            dispatch(
              uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!',
              })
            );
          
        }
    }
}
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending',
            message: 'sending cart data ...'
        }))

        const sendRequest = async () => {
            const res = await fetch("https://react-sample-d0a66-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
                method: 'PUT',
                body: JSON.stringify(cart)
            })
            if (!res.ok) {
                throw new Error("Some thing went wrong")
            }
        }

        try {
            await sendRequest()

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'send successfully !'
            }))
        } catch (error) {
            sendCartData().catch(error => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error occur!',
                    message: 'Sending data failed : ' + error
                }))
            })
        }
    }
}