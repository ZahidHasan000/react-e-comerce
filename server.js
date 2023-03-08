const mongoose = require('mongoose');
const dotenv = require('dotenv');

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
dotenv.config({ path: './config.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET);
// require('./connection')
const server = http.createServer(app);

//reason for socket io
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', "DELETE"]
});

// const User = require('./models/User');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const imageRoutes = require('./routes/imageRoutes')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/Users', userRoutes);
app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/images', imageRoutes);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

//Payment routes
app.post('/create-payment', async (req, res) => {
    const { amount } = req.body;
    console.log(amount);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.status(200).json(paymentIntent)
    } catch (e) {
        //   console.log(e.message);
        res.status(400).json(e.message);
    }
})

if (process.env.NODE_ENV === 'production') {
    const path = require('path')

    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'e-comerce-frontend', 'build')))
        res.sendFile(path.resolve(__dirname, 'e-comerce-frontend', 'build', 'index.html'))
    })
}

server.listen(7000, () => {
    console.log('server running at port', 7000)
});

//that we can had this available in our io route 
app.set('socketio', io);