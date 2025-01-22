import mongoose, { Schema, models } from 'mongoose';

const WorkOrderSchema = new Schema({
  wo_id: { type: String, required: true }, // Work Order ID
  subscriptionTier: { type: mongoose.Schema.Types.ObjectId, ref:'SubscriptionTier',required: true },
  wo_description: { type: String, required: true }, // Description of the work order
  status: { 
    type: String, 
    required: true, 
    enum: ["Completed", "InProgress", "Pending"], // Status options
  },
  totalInvoiceAmount: { type: Number, required: true }, // Total invoice amount
  worked_with: { type: String, required: true }, // Who the work was done with
  dateStart: { type: Date, required: true }, // Start date
  dateCompleted: { type: Date, default: null }, // Completion date (nullable)
}, { timestamps: true, collection: 'work_orders' }); // Explicit collection name

const WorkOrder = models.WorkOrder || mongoose.model('WorkOrder', WorkOrderSchema);

export default WorkOrder;


// example work_order:
// {
//     "_id": {
//       "$oid": "6736a570e346ad017b3d833f"
//     },
//     "wo_id": "WO123",
//     "subscriptionTier": "6736a523e346ad017b3d833d",
//     "wo_description": "Install new display setup",
//     "status": "Completed",
//     "totalInvoiceAmount": 1200,
//     "worked_with": "TechTeam Inc.",
//     "dateStart": "2021-02-01",
//     "dateCompleted": "2021-02-15"
//   }