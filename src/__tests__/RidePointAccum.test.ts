import RidePoint from "../RidePoint";
import RidePointAccum from "../RidePointAccum";

describe('Ride Point Accum', () => {
    describe('accum', () => {

        it('records the min/max speed & total points', () => {
            const accumulator = accumSpeeds([15, 30, 23]);

            expect(accumulator.maxSpeed).toEqual(30);
            expect(accumulator.minSpeed).toEqual(15);
            expect(accumulator.totalPoints).toEqual(3);
        });

        it('records speed to distance information', () => {
            const accumulator = accumSpeeds([15, 30, 23, 23]);

            expect(accumulator.speedDist).toEqual({
                23: 2,
                15: 1,
                30: 1,
            });
        });
    });

    describe('bands', () => {
        it('distributes information across multiple bands', () => {
            const accumulator = accumSpeeds([15, 15, 20, 20]);

            expect(accumulator.bands(2)).toEqual({
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 1,
            });            
        });
    });
});

const accumSpeeds = (speeds: number[]): RidePointAccum => {
    const accumulator = new RidePointAccum();

    speeds.forEach(s => accumulator.accum(makeRidePoint(s)));

    return accumulator;
};

const makeRidePoint = (speed= 20, lat = 19.5, lng = 12.3) => {
    return new RidePoint(speed, lat, lng);
};
