import mongoose, { Schema, models } from 'mongoose';

// Schemas for Subdocuments
const WorkOrderSchema = new Schema({
  wo_description: { type: String, required: true },
  wo_id: { type: String, required: true },
  status: { type: String, required: true, enum: ['Completed', 'InProgress', 'Pending'] },
  totalInvoiceAmount: { type: Number, required: true },
  worked_with: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateCompleted: { type: Date, default: null },
});

const ContactInfoSchema = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    validate: {
      validator: v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: props => `${props.value} is not a valid email!`,
    },
  },
});

const OwnerSchema = new Schema({
  name: { type: String, required: true },
  store: { type: String, required: true },
  contactInfo: { type: ContactInfoSchema, required: true },
});

const SpotColorsSchema = new Schema({}, { strict: false });

const BrandSchema = new Schema({
  logo: { type: String, default: '' },
  name: { type: String, required: true },
  siteUrl: { type: String, required: true },
  spotColors: { type: SpotColorsSchema, required: true },
});

const SubscriptionTierSchema = new Schema({
  tier: { type: String, required: true, enum: ['Basic', 'Standard', 'Premium'] },
  frequency: { type: String, required: true, enum: ['Monthly', 'Quarterly', 'Yearly'] },
});

// Main Storefront Entity Schema
const StorefrontEntitySchema = new Schema({
  id: { type: String, required: true },
  brand: { type: BrandSchema, required: true },
  startDate: { type: Date, required: true },
  tags: { type: [String], default: [] },
  assets: { type: Map, of: String }, // Flexible structure for future-proofing
  owner: { type: OwnerSchema, required: true },
  subscriptionTier: { type: SubscriptionTierSchema, required: true },
  component: { type: String, default: '', required: false },
  workOrders: { type: [WorkOrderSchema], default: [] },
}, { timestamps: true, versionKey: false }); // Enable timestamps and remove version key

// Indexes for Efficient Queries
StorefrontEntitySchema.index({ tags: 1 });
StorefrontEntitySchema.index({ tags: 1, startDate: -1 });

const StorefrontEntities =
  models.Storefronts || mongoose.model('Storefronts', StorefrontEntitySchema);

export default StorefrontEntities;
