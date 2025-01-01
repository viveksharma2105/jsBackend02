//making wrapper for code by  promises
const  asyncHandler = (requestHandler)=>{
return (req, res, next)=>{
Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err))

}
}

export {asyncHandler}



//second method for making wrapper for code by try, catch method (we just  put value no need to type code again again)

// const asyncHandler = (fn)=> async(req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })
//     }

// }
// export {asyncHandler}
