import express from 'express';
import { getCount, incrementOrInsertView, initDatabase, printAll } from './utils/database';
import cors from 'cors';


const app = express();
const port = 6767;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.urlencoded({ extended: true }));
initDatabase()
app.get('/', (req, res) => {
    res.send('An api to save view count of the static blogs, send the UUID and url');
});

app.post('/view', (req, res) => {
    setTimeout(() => {
        const body: postBody = req.body
        incrementOrInsertView(body.uuid, body.url);
        
        res.send({count:getCount(body.uuid)})
    }, 0);
 
})
app.post('/get', (req, res) => {
    setTimeout(() => {
        const body: postBody = req.body
        res.send({count:getCount(body.uuid)})
    }, 0);
 
})
printAll()
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
