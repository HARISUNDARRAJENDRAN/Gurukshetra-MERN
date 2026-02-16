import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, default: '' },
    name: {type: String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    profileImage: { type: String, default: '' },
    role: { type: String, enum: ['student', 'educator'], default: 'student' },
    verifyOtp: {type:String, default: ''},
    verifyOtpExpireAt: {type: Number , default: 0},
    isAccountVerified: {type:Boolean, default:false},
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0},
})

userSchema.pre('validate', function (next) {
    this.fullName = this.fullName || this.name;
    this.name = this.name || this.fullName;
    next();
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel;