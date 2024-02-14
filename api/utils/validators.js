import { body,validationResult } from "express-validator";


export const validate=(validations)=>{
    return async (req,res,next)=>{
        for (let validation of validations) {
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
            
        }

        const errors=validationResult(req)
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors:errors.array()})
    }
}


export const signUpValidator=[
    body('username').notEmpty().withMessage("Username is required field").isLength({min:2}).withMessage("Username must contain atleast 2 characters"),
    body("email").trim().isEmail().withMessage("Please enter valid email").notEmpty().withMessage("Email is required field"),
    body("password").trim().notEmpty().withMessage("Password is required field").isLength({min:6}).withMessage("Password should contain atleast 6 characters"),
]


export const signInValidator=[
    body("email").trim().isEmail().withMessage("Please enter valid email").notEmpty().withMessage("Email is required field"),
    body("password").trim().notEmpty().withMessage("Password is required field").isLength({min:6}).withMessage("Password should contain atleast 6 characters"),
]


export const updateValidator=[
    body('username').isLength({min:2}).withMessage("Username must contain atleast 2 characters"),
    body("email"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain atleast 6 characters"),
    body("photo"),
]