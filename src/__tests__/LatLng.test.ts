import LatLng from "../LatLng";

describe('LatLng', () => {
    describe('constructor', () => {
        it('should support construction via object with lat/lng', () => {
            const result = new LatLng({lat: 25, lng: 35});

            expect(result.lat).toEqual(25);
            expect(result.lng).toEqual(35);
        });

        it('should support construction via object with position*', () => {
            const result = new LatLng({position_lat: 25, position_long: 35});

            expect(result.lat).toEqual(25);
            expect(result.lng).toEqual(35);
        });

        it('should support construction via two parameters', () => {
            const result = new LatLng(25, 35);

            expect(result.lat).toEqual(25);
            expect(result.lng).toEqual(35);
        });

        it('should fail if other arguments are provided', () => {
            expect(() => new LatLng(9)).toThrowError();
            expect(() => new LatLng(9, 10, 11)).toThrowError();
            expect(() => new LatLng({l1: 9, l2: 10})).toThrowError();
        });
    });

    describe('googleString', () => {
        it('should format a string', () => {
            const latLng = new LatLng(12.99, 23.5);

            expect(latLng.googleString()).toEqual('{\"lat\":12.99,\"lng\":23.5}');
        });
    });
})