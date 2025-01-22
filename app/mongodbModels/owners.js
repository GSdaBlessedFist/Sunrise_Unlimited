import mongoose, { Schema, models } from 'mongoose';

// Sub-schema for Contact Information
const ContactInfoSchema = new Schema({
  email: { 
    type: String, 
    required: true,
    validate: {
      validator: (v) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
});

// Main Schema for Owners
const OwnerSchema = new Schema({
  id: { type: String, required: true }, // Assuming `id` is a string and not a MongoDB ObjectId
  name: { type: String, required: true },
  contactInfo: { type: ContactInfoSchema, required: true },
  store: { type: String, required: true },
  workOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder', // Referencing the WorkOrder model, which should point to the 'work_orders' collection
  }]
}, { timestamps: true,collection: 'owners'  }); // Automatically adds `createdAt` and `updatedAt`

// Model Creation
const Owner = models.Owner || mongoose.model('Owner', OwnerSchema);

export default Owner;
