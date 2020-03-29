const fs = require('fs');//can be used to check to see if a file exists
const crypto = require('crypto')

class UsersRepository {
    constructor(filename) {// In Constructor functions in JavaScript are not allowed to be async in nature
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }
        this.filename = filename;
        //Entire application you and I are only ever going to create exactly one instance of users Repository, We're going to have this one instance sitting around in and whenever we need to work with our users we are going to get access to that instance
        try {
            //function accessSync(path: PathLike, mode?: number): void. Synchronously tests a user's permissions for the file specified by path.
            fs.accessSync(this.filename);
        } catch (err) {
            //function writeFileSync(path: string | number | Buffer | URL, data: any, options?: WriteFileOptions): void. Synchronously writes data to a file, replacing the file if it already exists.
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll() {
        // Open the file called this.filename
        //readFile(path: string | Buffer | URL | promises.FileHandle, options?: { encoding?: null; flag?: string | number; }): Promise<Buffer>. A path to a file. If a URL is provided, it must use the file: protocol. If a FileHandle is provided, the underlying file will not be closed automatically. Asynchronously reads the entire contents of a file.
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        );
    }

    async create(attrs) {
        attrs.id = this.randomId();
        // {email: '...', password..}
        const records = await this.getAll();
        records.push(attrs);
        // write the updated 'records' array back to this.filename
        await this.writeAll(records);
        return attrs;
    }
    async writeAll(records) {
        //stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); //{encoding: 'utf8'} default
    }
    randomId() {
        return crypto.randomBytes(4).toString('hex');   // we can think of a buffer as being like an array that has some data
    }
    async getOne(id){
        const records = await this.getAll();
        //(predicate: (value: number, index: number, obj: Int8Array) => boolean, thisArg?: any): number. find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined. Returns the value of the first element in the array where predicate is true, and undefined otherwise.
        return records.find(record => record.id === id);    // or undefined 
    }
    async delete(id){
        const records = await this.getAll();
        //Filter nhận các đối số giống như map và hoạt động rất giống nhau . Sự khác biệt duy nhất là callback cần trả về true hoặc false , nếu nó là true mảng không thay đổi nếu là false phần tử đó sẽ được lọc ra khỏi mảng ban đầu .
        const filteredRecords = records.filter(record => record.id !== id);  // record for false elements
        await this.writeAll(filteredRecords); 
    }
    async update(id, attrs){
        const records = await this.getAll();
        const record = records.find(record => record.id ===id);
        if(!record){
            throw new Error(`Record with id ${id} not found`);
        }

        //(method) ObjectConstructor.assign<T, U>(target: T, source: U): T & U (+3 overloads). Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
        // record ==={ email: 'test@gmail.com'}  // attrs ==={password:'123123'};
        Object.assign(record,attrs);   // record ={email: 'test@gmail.com', password:'123123'}
        this.writeAll(records);
    }
    async getOneBy(filters){    // filters is an object
        const records = await this.getAll();
        for(let record of records){ // loop the value (whole value) of the records
            let found = true;
            for (let key in filters){
                if (record[key] !== filters[key]){
                    found = false;
                }
            }
            if (found) return record;
        }
        
    }
}

//We're going to instead Export an instance of the class
module.exports = new UsersRepository('users.json');  // not module.exports = UsersRepository

