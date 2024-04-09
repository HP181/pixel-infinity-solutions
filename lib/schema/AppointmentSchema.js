import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date : {type: Date, default: Date.now, required: true},
    subject: { type: String, required: true },
    desc: { type: String, required: true },
    status: {type: String, required: true, default: 'pending'}, // pending, confirmed, rejected
    isVerifiedByAdmin : {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema)

export default Appointment;
