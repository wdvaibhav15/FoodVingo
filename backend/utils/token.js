import jwt from "jsonwebtoken" 
const genToken = async (UserId) => {
   try {
    const token = await jwt.sign({UserId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"}) 
    return token
   } catch (error) {
    console.log(error)
   }
}

export default genToken