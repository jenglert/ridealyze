import RidePoint from '../RidePoint';

const ridePointJson = {
    timestamp: '2018-06-25T16:01:28.000Z',
    elapsed_time: 11112,
    position_lat: 40.72519308887422,
    position_long: -74.26716238260269,
    distance: 48.121980136005725,
    accumulated_power: 2288399,
    altitude: 0.010439036029587182,
    speed: 15.379714285714286,
    power: 154,
    cadence: 86,
    temperature: -246.14999999999998,
    left_torque_effectiveness: 152,
    right_torque_effectiveness: 0,
    left_pedal_smoothness: 42,
    right_pedal_smoothness: 0,
    fractional_cadence: 0,
};

describe('RidePoint', () => {
    it('should be able to parse an example ride point', () => {
        const result = RidePoint.fromFitRecord(ridePointJson);

        expect(result.fSpeed).toEqual(15);
        expect(result.latLng.lat).toEqual(40.72519308887422);
        expect(result.latLng.lng).toEqual(-74.26716238260269);
        expect(result.speed).toEqual(15.379714285714286);
    });

    it('can be instantiated via constructor', () => {
        const result = new RidePoint(20.5, 88, 25);

        expect(result.fSpeed).toEqual(20);
        expect(result.latLng.lat).toEqual(88);
        expect(result.latLng.lng).toEqual(25);
        expect(result.speed).toEqual(20.5);
    });
});
