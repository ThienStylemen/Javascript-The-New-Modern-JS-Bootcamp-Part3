const layout = require('../layout');    // require our layout function


module.exports = ({ req }) => {
    return layout({
        content: `
            <div>
                YOUR ID is: ${req.session.userId}
                <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
                </form>
            </div>
        `
    });
}