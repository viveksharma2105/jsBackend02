import mongoose,{Schema} from "mongoose";
import jwt  from "jsonwebtoken"
import bcrypt from "bcrypt" //we use mongoose hooks like 'pre' .before data store we use this hook for encryption

const userSchema = new Schema({
username:{
    type :String,
    required :true,
    unique: true,
    lowecase: true,
    trim: true,
    index: true

},

email:{
    type :String,
    required :true,
    unique: true,
    lowecase: true,
    trim: true,

},

fullName:{
    type :String,
    required :true,
    trim: true,
    index: true

},

avatar:{
    type: String,     //cloudinary url
    required: true,

},

coverImage:{
type:String,     //cloudinary url

},

watchHistory:[
{    type:  Schema.Types.ObjectId,
    ref: "Video"
}     
],

password:{
    type:String,
    required:[true,'Password is  required']
},

refreshToken:{
    type:String
}



},{
    timestamps:true
})

//using pre hook for  pwd encryption 
// do not use arrow fn in this because  aroow  fn  does not have this  refrence
//it should be  async because it  take more time
//use next for passing the  flag to  next  . this  next is of req,res,next

userSchema.pre("save",  async function (next) {
    if (!this.isModified()) return next(); //use  for  not changing thepwd every time like if we change the avatar the password remain  untouched

    this.password  = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
)
}

export const  User = mongoose.model("User",userSchema)