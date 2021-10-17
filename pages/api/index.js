
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

const stripe = new Stripe(''); // usar variable de entorno jeje :D

app.use(cors());
app.use(express.json());


app.post('/api/checkout', async (req, res) => {

    try {

        const { amount, id, products } = req.body; // crear el amount con los precios reales (el amount lo tienes que multiplicar por 100 porque stripe lo recibe en centavos)

        const payment = await stripe.paymentIntents.create({
            currency: 'USD',
            amount,
            description: 'Usar nombres de los productos comprados',
            payment_method: id,
            confirm: true // confirma el pago automáticamente
        })

        console.log(payment);
        res.send({ message: 'Pago realizado con éxito' });

    } catch (error) {
        console.log('Error: ', error);
        res.jsonp({ message: error.raw.message })
    }
})

app.listen(3001, () => {
    console.log('Server listening on port', 3001);
})

