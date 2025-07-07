export class Document {
        public _id? : string;
        public id: string;
        public name: string;
        public description: string;
        public url: string;
        public children?: Document[];
    
    constructor(id: string, name: string, description: string, url: string, children: Document[], _id?: string) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;
    }
}