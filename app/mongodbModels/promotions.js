import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const PromotionSchema = new Schema(
  {
    promotionName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      text: {
        type: String,
        required: true,
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
    },
    pricing: {
      type: Number,
      required: true,
      min: 0, 
    },
    promoCode: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Promotions =
  models.Promotions || mongoose.model('Promotions', PromotionSchema);

export default Promotions;

//example entry
// {
//   "_id": {
//     "$oid": "674e52d4b8834f9805417697"
//   },
//   "promotionName": "Holiday Bash",
//   "description": {
//     "text": "Get your brand noticed this holiday season!",
//     "includes": {
//       "common_instoreProps": 5,
//       "custom_instoreProps": 5,
//       "standupSigns": 15,
//       "wallPosters": 5,
//       "aerialAdvertisement": 1,
//       "bigScreen": 3,
//       "propPlacement": 0
//     }
//   },
//   "pricing": 750,
//   "promoCode": "HOLIDAY2024",
//   "createdAt": "2024-12-02T12:34:56.789Z",
//   "updatedAt": "2024-12-02T12:34:56.789Z"
// }