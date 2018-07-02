class RidePointAccum {
    constructor() {
        this.maxSpeed = 0;
        this.minSpeed = 99999;
        this.speedDist = {};
        this.totalPoints = 0;
    }

    // Note: Planning on mutating ridePoint in later iterations - I guess....
    accum(ridePoint) {
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

    bands(numBands) {
        const pointsPerBand = Math.floor(this.totalPoints / numBands);
        var pointsUsedInBand = 0;
        const finalResults = {};
        var currentBand = 0;

        for (var speed = Math.floor(this.minSpeed); speed <= Math.floor(this.maxSpeed); speed++) {
            const pointsAtSpeed = this.speedDist[speed];
            pointsUsedInBand = pointsUsedInBand + pointsAtSpeed;
            finalResults[speed] = currentBand;

            if (pointsUsedInBand > pointsPerBand) {
                pointsUsedInBand = 0;
                currentBand++;
            }
        }

        return finalResults;
    }
}

export default RidePointAccum;