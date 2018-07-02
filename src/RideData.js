import _ from 'lodash';

class RideData {
    constructor(ridePointAccum, records) {
        this.ridePointAccum = ridePointAccum;
        this.records = records;
    }

    recordsByBand() {
        const speedsToBands = this.ridePointAccum.bands(RideData.colors().length);
        var results = [];
        var resultsInCurrentBand = [];
        var currentBand = speedsToBands[this.records[0].fSpeed];

        for (var i = 0; i < this.records.length; i++) {
            const record = this.records[i];
            const recordBand = speedsToBands[this.records[i].fSpeed];

            if (currentBand == recordBand) {
                resultsInCurrentBand.push(record);
            } else {
                const resultsInCurrentBandAsString = '[' + _.map(resultsInCurrentBand, (r) => r.latLng.googleString()).join(', ') + ']';
                results.push([RideData.colors()[currentBand], resultsInCurrentBandAsString]);
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