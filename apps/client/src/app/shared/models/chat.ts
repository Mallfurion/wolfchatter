export class Chat {
    id: number;
    lat: number;
    lng: number;

    constructor(data) {
        this.id = data.id;
        this.lat = data.lat;
        this.lng = data.lng;
    }
}