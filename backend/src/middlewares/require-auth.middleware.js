 function requireAuth(req,res,next){
    if(!req.currentUser){
        res.status(401).send("Not authorised")
    }
    next()
}

module.exports = requireAuth