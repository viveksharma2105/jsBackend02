import {asyncHandler}  from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import{ user} from "../models/user.model.js"

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
  console.log(email);

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
const existedUser = User.findOne({
  $or: [{username},{email}]
})

if(existedUser){
  throw new ApiError(409, "user with username or email is  already exist")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

})
    


export {registerUser}