export class Author {
        public id: string;
        public name: string;
        public email: string;
        public age: number;
        public imageUrl: string;
        public group: Author[];
    
    constructor(id: string, name: string, email: string, age: number, imageUrl: string, group: Author[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}