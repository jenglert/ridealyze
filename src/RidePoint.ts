import LatLng from './LatLng';

export default class RidePoint {

    /*
    {
        timestamp: 2018-06-25T16:01:28.000Z,
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
        fractional_cadence: 0
    }
    */
    public static fromFitRecord(fitRecord: any) {
        return new RidePoint(
            fitRecord.speed,
            fitRecord.position_lat,
            fitRecord.position_long,
        );
    }

    public speed: number;
    public fSpeed: number;
    public latLng: LatLng;

    constructor(speed: number, lat: number, lng: number) {

        this.speed = speed;
        this.fSpeed = Math.floor(speed);
        this.latLng = new LatLng(lat, lng);
    }
}
