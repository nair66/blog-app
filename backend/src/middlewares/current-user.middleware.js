const jwt =  require('jsonwebtoken')

 function currentUser(req,res,next){
    if(req.session && req.session.jwt){
        const payload = jwt.verify(req.session.jwt, 'random')
        req.currentUser = payload
    }
    next()
}

module.exports = currentUser