const layout = require('../layout');    // require our layout function

module.exports = () => {
    return layout( {
        content: `
            <div>
                <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
                </form> 
            </div>
        `
    });
}