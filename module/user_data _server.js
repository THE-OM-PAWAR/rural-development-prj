//============= checking & serving user specific stuff ==============//

const jwt = require("jsonwebtoken");
const { users } = require('./User_Module');

const data_serving = async (req , res , next)=>{
    try {
        const token = req.cookies.jwt_user;
        const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        const user = await users.findOne({ _id : verifyUser._id})

        req.token = token;
        req.user = user;
        next()

    } catch (error) {
        
        res.status(201).json({
        user_name: "modal5",
        method: "get",
        headers: {
          "content-type": "application/json",
        },
        body:{
        modal_html : `
            <div class="modal_wrapper">
                <div class="modal_container">
                    <button class="close">&times;</button>
                    <h2 class="modal_h2" >Sign In & Login now</h2>
                    <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ipsa exercitationem error neque consequuntur amet possimus quidem excepturi, esse dolore qui? Eos quisquam omnis, doloribus quibusdam iste optio beatae earum.</p>
                    <div class="action">
                        <a href="signIn.html" ><button class="btn_purple">Sign In</button></a>
                        <a href="logIn.html" ><button class="btn_purple">Login</button></a>
                    </div>
                </div>
            </div>`
        }})
    }

}

module.exports = data_serving;