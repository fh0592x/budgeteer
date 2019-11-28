import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, parseInt(process.env.SECRET))
    .then(hash => {
        user.password = hash;
        return next();
    })
    .catch(err => next(err.message));
});

UserSchema.methods.comparePassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

export default mongoose.model('User', UserSchema);