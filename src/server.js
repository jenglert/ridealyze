import express from 'express';
import morgan from 'morgan';
import { boundingBox, readFit } from './fitParse';
import RideData from './RideData';

const app = express();

app.set('view engine', 'ejs')
app.use(morgan('combined'));

app.get('/maps', async (req, res) => {
    const rideData = await readFit('./test-data/2018-06-25-08-56-16.fit');
    const { min, max, avg } = boundingBox(rideData.records);
    const recordsByBand = rideData.recordsByBand();
    console.log('recordsByBand', recordsByBand.length);

    res.render('maps', {
        center: avg,
        min,
        max,
        recordsByBand,
    });
});



export default app