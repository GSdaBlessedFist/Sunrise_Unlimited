import mongoose, { Schema, models } from 'mongoose';

const SubscriptionTierSchema = new Schema({
  id: { type: String, required: true }, // Assuming `id` is a custom string identifier
  tier: { 
    type: String, 
    required: true,
    enum: ["Standard", "Plus", "Premium"], // Placeholder options; replace as needed
  },
  includes: {
    common_instoreProps:{
      type: Number,
      default: 0,
      min: 0, 
    },
    custom_instoreProps:{
      type: Number,
      default: 0,
      min: 0, 
    },
    standupSigns: {
      type: Number,
      default: 0,
      min: 0, 
    },
    wallPosters: {
      type: Number,
      default: 0,
      min: 0,
    },
    aerialAdvertisement: {
      type: Number,
      default: 0,
      min: 0,
    },
    bigScreen: {
      type: Number,
      default: 0,
      min: 0,
    },
    propPlacement: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  pricing: {
    type: Number,
    required: true,
    min: 0, 
  },
}, { timestamps: true, collection: 'subscription_tiers' }); // Explicit collection name

const SubscriptionTier = models.SubscriptionTier || mongoose.model('SubscriptionTier', SubscriptionTierSchema);

export default SubscriptionTier;


// example subscribe_tier:
// {
//   "id": "standard-tier",
//   "tier": "Standard",
//   "includes": {
//     "common_instoreProps": 10,
//     "custom_instoreProps": 0,
//     "standupSigns": 0,
//     "wallPosters": 0,
//     "aerialAdvertisement": 0,
//     "bigScreen": 0,
//     "propPlacement": 0
//   },
//   "pricing": 200,
// }
