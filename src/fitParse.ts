import EasyFit from 'easy-fit';
import fs from 'fs';
import _ from 'lodash';
import LatLng from './LatLng';
import RidePointAccum from './RidePointAccum';
import RidePoint from './RidePoint';
import RideData from './RideData';

type ReadFitFunc = (filename: string) => any;
export const readFit: ReadFitFunc = (filename) => {
    const promise = new Promise((resolve, reject) => {

        fs.readFile(filename, function (err, content) {

            if (err) {
                reject(err);
            }

            // Create a EasyFit instance (options argument is optional)
            var easyFit = new EasyFit({
                force: true,
                speedUnit: 'mph',
                lengthUnit: 'mi',
                temperatureUnit: 'kelvin',
                elapsedRecordField: true,
                mode: 'cascade',
            });

            // Parse your file
            easyFit.parse(content, function (error, data) {

                // Handle result of parse method
                if (error) {
                    reject(error);
                } else {
                    var records = [];
                    const rpa = new RidePointAccum();

                    for (var i = 0; i < data.activity.sessions.length; i++) {
                        const session = data.activity.sessions[i];
                        for (var lapcnt = 0; lapcnt < session.laps.length; lapcnt++) {
                            const lap = session.laps[lapcnt];
                            records = records.concat(_.map(lap.records, function (r) {
                                const rp = new RidePoint(r);
                                rpa.accum(rp);
                                return rp;
                            }));
                        }
                    }

                    resolve(new RideData(rpa, records));
                }
            });
        });
    });

    return promise;
};

export const boundingBox = (results) => {
    const min = { lat: 999, lng: 999 };
    const max = { lat: -999, lng: -999 };

    for (var i = 0; i < results.length; i++) {
        const result = results[i].latLng;
        if (result.lat < min.lat) {
            min.lat = result.lat;
        }

        if (result.lng < min.lng) {
            min.lng = result.lng;
        }

        if (result.lat > max.lat) {
            max.lat = result.lat;
        }

        if (result.lng > max.lng) {
            max.lng = result.lng;
        }
    }

    const avg = new LatLng((min.lat + max.lat) / 2, (min.lng + max.lng) / 2);
    const minObj = new LatLng(min);
    const maxObj = new LatLng(max);

    return {
        min: minObj,
        max: maxObj,
        avg
    };
}
