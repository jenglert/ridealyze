import RidePoint from "../RidePoint";
import RidePointAccum from "../RidePointAccum";

describe('Ride Point Accum', () => {
    describe('accum', () => {

        it('record the min/max speed', () => {
            const accumulator = new RidePointAccum();

            accumulator.accum(makeRidePoint(15));
            accumulator.accum(makeRidePoint(30));
            accumulator.accum(makeRidePoint(23));

            expect(accumulator.maxSpeed).toEqual(30);
            expect(accumulator.minSpeed).toEqual(15);
        });

    });
});

const makeRidePoint = (speed= 20, lat = 19.5, lng = 12.3) => {
    return new RidePoint({speed, lat, lng});
}