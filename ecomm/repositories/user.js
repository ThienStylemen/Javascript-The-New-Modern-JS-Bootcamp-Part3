const fs = require('fs');//can be used to check to see if a file exists
const crypto = require('crypto');
const util = require('util');
const script = util.promisify(crypto.scrypt); // promisify
const Repository = require('./repository');


/* crypto.scrypt(attrs.password, salt, 64, (err, buf) => {
  const hased = buf.toString('hex');
}); */

class UsersRepository extends Repository {
  async create(attrs) { //attrs ==={email, password}, create a user is a little bit complicate
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await script(attrs.password, salt, 64);//hashed

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`  // replaced
    }
    records.push(record);
    await this.writeAll(records);    // write the updated 'records' array back to this.filenam

    return attrs;
  }

  async comparePasswords(saved, supplied) { // saved: in our database hased.salt
    const [hashed, salt] = saved.split('.'); //const hased =result[0]; const salt = result[1];
    const hashedSuppliedBuf = await script(supplied, salt, 64);  // script return a Buffer
    return hashed === hashedSuppliedBuf.toString('hex');
  }
}

//We're going to instead Export an instance of the class
module.exports = new UsersRepository('users.json');  // not module.exports = UsersRepository

