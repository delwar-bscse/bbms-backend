import JWT from 'jsonwebtoken'

// const token = JWT.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

export default  async(req,res,next)=>{
  try {
    const token = req.headers['authorization'].split(" ")[1];
    // console.log(req.headers['authorization'].split(" "));

    JWT.verify(token, process.env.JWT_SECRET, (err,decode)=>{
      if(err){
        return res.status(401).send({
        success: false,
        error: err,
        message: 'Token missing & Auth Failed'
      })}else{
        req.body.userId = decode.userId;
        next();
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: 'Auth Failed'
    })
  }
}