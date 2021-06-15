const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const ResetToken = require('./resetToken');

// role hierarchy management should be updated! Current security for roles is insufficient
const roles = ['staff', 'manager'];

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is invalid');
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`password can't contain "password"!`)
            }
        },
    },
    role: { // this should be validate to change. Current security is insufficient!
        type: String,
        trim: true,
        lowercase: true,
        require: true,
        default: 'staff',
        validate(value) {
            if (!roles.includes(value.toLowerCase().trim())) {
                throw new Error(`"${value}" is not a valid role!`);
            }
        },
    },
    banned: {
        type: Boolean,
        require: true,
        default: false
    },
    active: {
        type: Boolean,
        require: true,
        default: false
    },
    note: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
    },
    carry_shop_id: {
        type: Number,
        trim: true,
        require: true,
        default: 137,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    avatar: {
        type: Buffer,
    },
}, {
    timestamps: true,
});

// virtual property set up for mongoose to learn the relationship between collections
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});

// virtual property set up for mongoose to learn the relationship between collections
userSchema.virtual('resetToken', {
    ref: 'ResetToken',
    localField: '_id',
    foreignField: 'owner',
});

// we need to use 'this' to the specific user, so we should use a regular function statement
// 'methods' is the property for instances which method on every instance is a bit different
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString(), }, process.env.JWT_SECRET);

    // assign the token to the user instance 
    user.tokens = user.tokens.concat({ token });
    // save the instance to database 
    await user.save();

    return token;
}

userSchema.methods.generateResetToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + (60 * 15),
    }, process.env.JWT_SECRET);

    return token;
}

// return only non-sensitive data back to user after singup and login 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

// create a new method to check user email (as account) and password 
// 'statics' is the property accessible on the prototype
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });

    // throw an error if there's no user
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// hash the plain text password before saving 
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    // delete multiple tasks by using only the owner field
    await Task.deleteMany({ owner: user._id });
    // delete multiple token by using only the owner field
    await ResetToken.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;