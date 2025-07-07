export class Book {
        public _id? : string;
        public id: string;
        public name: string;
        public description: string;
        public url: string;
        public release: Date;
        public children?: Book[];
    
    constructor(id: string, name: string, description: string, url: string, release: Date, children: Book[], _id?: string) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.release = release;
        this.children = children;
    }
}