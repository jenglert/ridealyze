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
    speedsToBands: {[speed: number]: number};

    colorsToSpeedRanges: () => IColorToSpeedBand[];
    recordsByBand: (from: number, to: number) => RecordByBand[];
}

class RideData implements IRideData {
    ridePointAccum = null as IRidePointAccum;
    records = null as RidePoint[];
    speedsToBands = null as {[speed: number]: number};

    constructor(ridePointAccum, records) {
        this.ridePointAccum = ridePointAccum;
        this.records = records;
        this.speedsToBands = this.ridePointAccum.bands(RideData.colors().length);
    }

    /**
     * @returns array of objects w/ {color, max, min}
     */
    colorsToSpeedRanges() {
        var finalResult = RideData.colors().map(color => {
            return {
                color: color,
                max: -1,
                min: 9999999,
            }
        });
        var speedsToBands = this.speedsToBands;

        Object.keys(speedsToBands).forEach(function (fSpeed) {
            const band = speedsToBands[fSpeed];
            const fSpeedNum = Number.parseFloat(fSpeed); // Remove the cast

            if (fSpeedNum > finalResult[band].max) {
                finalResult[band].max = fSpeedNum;
            }

            if (fSpeedNum < finalResult[band].min) {
                finalResult[band].min = fSpeedNum;
            }
        });

        return finalResult;
    }

    recordsByBand(from = 0, to = this.records.length) {
        var results: RecordByBand[] = [];
        var resultsInCurrentBand: RidePoint[] = [];
        var currentBand = this.speedsToBands[this.records[0].fSpeed];

        for (var i = from; i < to; i++) {
            const record = this.records[i];
            const recordBand = this.speedsToBands[this.records[i].fSpeed];
            if (currentBand == recordBand) {
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

    static colors() {
        return ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00'];
    }
}

export default RideData;