import Layout from '../components/Layout'
import '../scss/main.scss'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux'
import { store } from '../store/store'

const stripePromise = loadStripe('pk_live_51Jl3XdFs0d77yk73VbCywurmAxX9q9T5AXaPxuIdc3EJtENpHfWFQseLTEWDuBOBBivexiu6fptn3T4ORJrdnhu900VoJ0Xtal');

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store} >
      <Elements stripe={stripePromise} >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </Provider>
  )
}

export default MyApp
