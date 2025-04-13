// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

// Define an interface for the User document
export interface IUser extends Document {
  name: string
  email: string
  password: string
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  matchPassword(enteredPassword: string): Promise<boolean>
}

// Define the schema
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpire: {
      type: Date
    }
  },
  { timestamps: true }
)

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Match user-entered password with hashed password
UserSchema.methods.matchPassword = async function (
  this: IUser,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Export the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
