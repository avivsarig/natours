/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51Ldso6HaugvLwaw3NMUd429y6eqFPG3P675gt3auXb18ufADsb5jSV9OBRpqOwNVp8s0mGufWRWHCUfr2LSd15mT00RoBNYTb2'
  );
  try {
    // 1) get session from API
    const session = await axios({
      url: `/api/v1/bookings/checkout-session/${tourId}`
    });

    // 2) Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('Error', err);
  }
};
