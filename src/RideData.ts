import _ from 'lodash';
import { IRidePointAccum } from './RidePointAccum';
import RidePoint from './RidePoint';

interface IColorToSpeedBand {
    color: string;
    max: number;
    min: number;
}

interface RecordByBand {
    color: string;
    recordCount: number;
    googleString: string;
}

export interface IRideData {
    ridePointAccum: IRidePointAccum;
    records: RidePoint[];
    speedsToBands: { [speed: number]: number };

    colorsToSpeedRanges: () => IColorToSpeedBand[];
    recordsByBand: (from: number, to: number) => RecordByBand[];
}

class RideData implements IRideData {
    public static colors() {
        return ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00'];
    }

    public ridePointAccum = null as IRidePointAccum;
    public records = null as RidePoint[];
    public speedsToBands = null as { [speed: number]: number };

    constructor(ridePointAccum, records) {
        this.ridePointAccum = ridePointAccum;
        this.records = records;
        this.speedsToBands = this.ridePointAccum.bands(RideData.colors().length);
    }

    /**
     * @returns array of objects w/ {color, max, min}
     */
    public colorsToSpeedRanges() {
        const speedsToBandEntries = Object.entries(this.speedsToBands);

        const result = [];
        for (let band = 0; band < RideData.colors().length; band++) {
            const color = RideData.colors()[band];

            const speedsInBand = speedsToBandEntries
                .filter(pair => pair[1] === band)
                .map(pair => pair[0]);

            result.push({
                color,
                max: _.max(speedsInBand),
                min: _.min(speedsInBand),
            });
        }

        return result;
    }

    public recordsByBand(from = 0, to = this.records.length) {
        const results: RecordByBand[] = [];
        let resultsInCurrentBand: RidePoint[] = [];
        let currentBand = this.speedsToBands[this.records[0].fSpeed];

        for (let i = from; i < to; i++) {
            const record = this.records[i];
            const recordBand = this.speedsToBands[this.records[i].fSpeed];
            if (currentBand === recordBand) {
                resultsInCurrentBand.push(record);
            } else {
                const resultsInCurrentBandAsString = '[' + _.map(resultsInCurrentBand, r => r.latLng.googleString()).join(', ') + ']';
                results.push({
                    color: RideData.colors()[currentBand],
                    recordCount: resultsInCurrentBand.length,
                    googleString: resultsInCurrentBandAsString,
                });
                resultsInCurrentBand = [record];
                currentBand = recordBand;
            }
        }

        return results;
    }
}

export default RideData;
