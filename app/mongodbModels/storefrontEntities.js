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
  tier: { type: String, required: true, 
  enum: ['Basic', 'Plus', 'Premium'] },
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
  subscriptionTier: { type: mongoose.Schema.Types.ObjectId, ref:'SubscriptionTier',required: true },
  billingFrequency: { type: String, required: true,enum: ["Monthly", "Quarterly", "Yearly"],
  },
  component: { type: String, default: '', required: false },
  workOrders: { type: [WorkOrderSchema], default: [] },
  promotions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Promotions', // This references the Promotions model
    },
  ],
}, { timestamps: true, versionKey: false }); // Enable timestamps and remove version key

// Indexes for Efficient Queries
StorefrontEntitySchema.index({ tags: 1 });
StorefrontEntitySchema.index({ tags: 1, startDate: -1 });

const StorefrontEntities =
  models.Storefronts || mongoose.model('Storefronts', StorefrontEntitySchema);

export default StorefrontEntities;


// example entry:
// {
//   id: "storefront-001",  // Unique identifier for this storefront
//   brand: {
//     logo: "https://example.com/logo.png",
//     name: "Awesome Store",  // Brand name
//     siteUrl: "https://www.awesomestore.com",  // Brand site URL
//     spotColors: { 
//       primary: "#FF5733", 
//       secondary: "#C70039" 
//     },  // Flexible structure for spot colors
//   },
//   startDate: new Date("2022-03-15"),  // Storefront start date
//   tags: ["electronics", "gadgets", "new"],  // Tags for the storefront
//   assets: { 
//     mainImage: "https://example.com/main-image.jpg",
//     backgroundImage: "https://example.com/bg-image.jpg"
//   },  // Dynamic assets (e.g., images, files)
//   owner: {
//     name: "John Doe",  // Owner's name
//     store: "Main Branch",  // Store name
//     contactInfo: {
//       name: "John Doe",
//       email: "john.doe@awesomestore.com",  // Owner's contact info
//     },
//   },
//   subscriptionTier: "6736a523e346ad017b3d833d",
//   billingFrequency: "Quarterly",
//   component: "storefront-main-component",  // Optional component field (e.g., React component name)
//   workOrders: [
//     {
//       wo_id: "WO123",
//       wo_description: "Install new display setup",
//       status: "Completed",  // Status options: Completed, InProgress, Pending
//       totalInvoiceAmount: 1200,
//       worked_with: "TechTeam Inc.",
//       dateStart: new Date("2021-02-01"),
//       dateCompleted: new Date("2021-02-15"),
//     },
//     {
//       wo_id: "WO124",
//       wo_description: "Repair faulty wiring",
//       status: "InProgress",
//       totalInvoiceAmount: 500,
//       worked_with: "Repair Corp",
//       dateStart: new Date("2023-05-10"),
//       dateCompleted: null,  // Still in progress
//     },
//   ],  // Array of work orders related to the storefront
//   promotions: [],  // Reference to promotions (if applicable)
// }