import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) =>{
  try {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];;
  if (!token) {
    return res.status(401).json({success:false, message: "Unauthorized" });
  }

  const decode =  jwt.verify(token, process.env.SECRET_KEY);

  if(!decode){
    return res.status(401).json({success: false, message:"Invalid token"});
  }
  
  req.id = decode.userId;
  next();

  } catch (error) {
    console.log(error);
    return res.status(404).json({success: false, message:"User Does Not Exists"})
  }
}

export default isAuthenticated;