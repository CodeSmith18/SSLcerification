const express = require('express');
const sslChecker = require('ssl-checker');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.post('/check-ssl', async(req ,res)=>{
    const domain = req.body.domain;
    // const domain = "www.google.com";
    try{
        const result = await sslChecker(domain);
        res.json(result);
        console.log(result);
    }
    catch(error){
        res.status(500).json({error: 'Failed to check SSL certificate'});
    }
});

app.listen(PORT,()=>{
    console.log('Server is running on port ${PORT}');
});