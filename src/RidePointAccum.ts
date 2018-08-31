import RidePoint from './RidePoint';

export interface IRidePointAccum {
    accum: (ridepoint: RidePoint) => void;
    bands: (numBands: number) => { [speed: number]: number };
}

class RidePointAccum implements IRidePointAccum {

    public maxSpeed: number;
    public minSpeed: number;
    public speedDist: { [fSpeed: number]: number };
    public totalPoints: number;

    constructor() {
        this.maxSpeed = 0;
        this.minSpeed = 99999;
        this.speedDist = {};
        this.totalPoints = 0;
    }

    // Note: Planning on mutating ridePoint in later iterations - I guess....
    public accum(ridePoint) {
        this.totalPoints++;

        if (ridePoint.speed > this.maxSpeed) {
            this.maxSpeed = ridePoint.speed;
        }

        if (ridePoint.speed < this.minSpeed) {
            this.minSpeed = ridePoint.speed;
        }

        const fSpeed = Math.floor(ridePoint.speed);
        if (this.speedDist[fSpeed] == null) {
            this.speedDist[fSpeed] = 1;
        } else {
            this.speedDist[fSpeed]++;
        }
    }

    /**
     * @returns maps of speed -> bandIndex (0, 1, 2, ... MAX_BAND)
     */
    public bands(numBands) {
        const pointsPerBand = Math.floor(this.totalPoints / numBands);
        let pointsUsedInBand = 0;
        const finalResults = {};
        let currentBand = 0;

        for (let speed = Math.floor(this.minSpeed); speed <= Math.floor(this.maxSpeed); speed++) {
            const pointsAtSpeed = this.speedDist[speed] || 0;
            pointsUsedInBand = pointsUsedInBand + pointsAtSpeed;

            if (pointsUsedInBand > pointsPerBand) {
                pointsUsedInBand = 1;
                currentBand++;
            }

            finalResults[speed] = currentBand;
        }

        return finalResults;
    }
}

export default RidePointAccum;
