import _ from 'lodash';

class LatLng {
    constructor(...args) {

        if (args.length == 1) {
            const arg0 = args[0];
            if (_.has(arg0, 'position_lat') &&
                _.has(arg0, 'position_long')) {
                this.lat = arg0.position_lat;
                this.lng = arg0.position_long;
            }
            else if (_.has(arg0, 'lat') &&
                _.has(arg0, 'lng')) {
                this.lat = arg0.lat;
                this.lng = arg0.lng;
            } else {
                throw new Error('Unable to create LatLng from: ' + args[0]);
            }
        } else if (args.length == 2) {
            this.lat = args[0];
            this.lng = args[1];
        } else {
            throw new Erorr('Unable to create latLng from: (' + args[0] + ', ' + args[1] + ')');
        }
    }

    googleString() {
        return JSON.stringify({
            lat: this.lat,
            lng: this.lng
        });
    }
}

export default LatLng;