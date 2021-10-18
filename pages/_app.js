import Layout from '../components/Layout'
import '../scss/main.scss'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux'
import { store } from '../store/store'

// const stripePromise = loadStripe('pk_live_51Jl3XdFs0d77yk73VbCywurmAxX9q9T5AXaPxuIdc3EJtENpHfWFQseLTEWDuBOBBivexiu6fptn3T4ORJrdnhu900VoJ0Xtal');

const stripePromise = loadStripe('pk_test_51Jl3XdFs0d77yk73d5drIT12Q86N6QgFw8kg03UXXPObtASJBinrBR2PS9V6FKXAPCmfWW0LPcuj7UIouSqyIjDo00DKuUQsTu');

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
