const Contenedor = require('./src/clases/Contenedor');
const products = new Contenedor('./src/data/productos.txt');
(async () => {
    await products.deleteAll();
    await products.save({title: 'Node js', price: 10, thumbnail:'https://i0.wp.com/www.jacobsoft.com.mx/wp-content/uploads/2020/04/node-js-736399_960_720-2.png?fit=960%2C480&ssl=1'});
    await products.save({title: 'Express js', price: 10, thumbnail:'https://i0.wp.com/www.jacobsoft.com.mx/wp-content/uploads/2020/04/node-js-736399_960_720-2.png?fit=960%2C480&ssl=1'});
    await products.save({title: 'Glitch', price: 10, thumbnail:'https://i0.wp.com/www.jacobsoft.com.mx/wp-content/uploads/2020/04/node-js-736399_960_720-2.png?fit=960%2C480&ssl=1'});
})();


const app = require('express')();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => { 
 res.send(`<h1>Welcome to Saul's Space</h1><h3>We have 2 end-points</h3><h4>/products</h4><h4>/randomProduct</h4>`);
});

app.get('/products', async (req, res) => {
    try {
        res.status(200).send(await products.getAll());
    } catch (error) {
        console.error(error);
    }
});

app.get('/randomProduct', async (req, res) => {
    try {
        let randomNumber = Math.floor(Math.random() * 3 +1);
        res.json(await products.getById(randomNumber));
    } catch (error) {
        console.error(error);
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

server.on('error', (error) => console.error(error));
