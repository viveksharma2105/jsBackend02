import mongoose,{Schema} from "mongoose";
import  mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //we have to use this before export .use as page wrapper , insert quaries  , order , sort

const videoSchema = new Schema({
    videoFile: {
        type: String,  //cloudinary url
        required: true
    },

    thumbnail: {
        type: String,  //cloudinary url
        required: true
    },

    title: {
        type: String,  
        required: true
    },

    description: {
        type: String,  
        required: true
    },

    duration: {
        type: Number, 
        required: true
    },

    views:{
        type:Number,
        default:0
    },

    isPublished:{
        type:Boolean,
        default:true
    },

    owner:{
        type : Schema.Types.ObjectId,
        ref:"User"

    }
},
{
    timestamps:true
})


//use mongoose-aggregate-paginate
videoSchema.plugin(mongooseAggregatePaginate)

export const user = mongoose.model("Video",videoSchema)