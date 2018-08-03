import express from 'express';
import morgan from 'morgan';
import { boundingBox, readFit } from './fitParse';

const app = express();

app.set('view engine', 'ejs')
app.use(morgan('combined'));

// 45 minutes - 1 record per second
const pageSize = 60 * 45;

app.get('/maps', async (req, res) => {
    const filename = req.param('filename');
    if (!filename) {
        res.statusMessage = "Filename is a required parameter";
        res.status(400).end();
        return;
    }

    const slice = req.param('slice');
    if (!slice) {
        res.statusMessage = "Slice is a required parameter";
        res.status(400).end();
        return;
    }
    console.error(`Loading: ${filename} @ slice ${slice}`);

    const from = pageSize * slice;
    const to = from + pageSize;

    const rideData = await readFit(filename);
    const { min, max, avg } = boundingBox(rideData.records.slice(from, to));
    const recordsByBand = rideData.recordsByBand(from, to);
    const colorsToSpeeds = rideData.colorsToSpeedRanges();

    console.log('colorsToSpeeds', colorsToSpeeds);

    res.render('maps', {
        center: avg,
        min,
        max,
        recordsByBand,
        colorsToSpeeds
    });
});

export default app