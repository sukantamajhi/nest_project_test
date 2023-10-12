import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['client', 'moderator', 'admin'],
      default: 'client',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('users', usersSchema);
