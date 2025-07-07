export class Location {
        public id: string;
        public name: string;
        public address: string;
        public phone: string;
    
    constructor(id: string, name: string, address: string, phone: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}