const fs =require('fs');//can be used to check to see if a file exists

class UsersRepository{
    constructor(filename){// In Constructor functions in JavaScript are not allowed to be async in nature
        if(!filename){
            throw new Error('Creating a repository requires a filename');
        }
        this.filename = filename;
        //Entire application you and I are only ever going to create exactly one instance of users Repository, We're going to have this one instance sitting around in and whenever we need to work with our users we are going to get access to that instance
        try{
            //function accessSync(path: PathLike, mode?: number): void. Synchronously tests a user's permissions for the file specified by path.
            fs.accessSync(this.filename);
        }catch(err){
            //function writeFileSync(path: string | number | Buffer | URL, data: any, options?: WriteFileOptions): void. Synchronously writes data to a file, replacing the file if it already exists.
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll(){
        // Open the file called this.filename
        //readFile(path: string | Buffer | URL | promises.FileHandle, options?: { encoding?: null; flag?: string | number; }): Promise<Buffer>. A path to a file. If a URL is provided, it must use the file: protocol. If a FileHandle is provided, the underlying file will not be closed automatically. Asynchronously reads the entire contents of a file.
        const contents = await fs.promises.readFile(this.filename, {encoding: 'utf8'});
        
        //read its content
        console.log(contents);

        //parse the contents

        // return the parsed data 
    }
}

// Nodejs requires you to put async await code inside of a function marked as a sink, due to that, we put it into a test function
const test = async ()=>{
    const repo = new UsersRepository('users.json');
    await repo.getAll();
}
test();