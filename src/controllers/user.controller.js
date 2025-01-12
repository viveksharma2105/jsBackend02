import {asyncHandler}  from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import{ User} from "../models/user.model.js"
import{uploadOnCloudinary} from "../utils/cloudinary.js"
import{ApiResponse} from "../utils/ApiResponse.js"


const registerUser =  asyncHandler(async (req, res) => {
  //steps to register user
  //1. get user details from frontend
  //2. validation -- not empty
  //3. check if user  already exist (by username, email)
  //4. check for images, avatar
  //5. upload them to cloudinary, avatar
  //6. create user object(because in mongodb objects are made and use ) -- create entry in db
  //7. remove pwd and refresh token feild from response
  //8. check for user creation
  //9. return response


  //step:1 (req.body  gives the data from frontend)

  const {fullName, email, username, password}  = req.body
  //console.log(email);

  //step 2
  
  //method1 either check all the feilds one by one  
  // if (fullName === "") {
  //   throw new ApiError(400,"fullname  is required")
  // }
  
  //method2 use "some" method use all feild in one code
  if ([fullName, email, username, password].some((field)=> 
    field?.trim() === "")) {
    
      throw new ApiError(400, " All fields are required")
  }

  //step3
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
})

if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
}
//console.log(req.files);

 const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0]?.path;

let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >  0){
  coverImageLocalPath = req.files.coverImage[0].path
}
 
//step4
if (!avatarLocalPath) {
  throw new  ApiError(404,"Avatar  file isrequired")
  
}

//step5
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
  throw new ApiError(400, "Avatar file is required")
  
}

//step6
const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username:username.toLowerCase()
})
//user checkby  id (user  created or not successfully)
//.select k aander vo fields jo hume nhi select krni minus laga kr likh sakte h or space dekr next field
const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
)
if (!createdUser) {
  throw new ApiError(500, "Something went wrong while registring the user ")
}

return res.status(201).json(
  new ApiResponse(200, createdUser , "user register successfully")
)

})
    


export {registerUser}