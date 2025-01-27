import mongoose from "mongoose";

const availablitySchema = new mongoose.Schema({
    isAvailable: { type: Boolean, default: true }, //Default: in the office
    updateAt: { type: Date, default: Date.now },
});

export const Availability = mongoose.models.Availability || mongoose.model(
    "Availability", availablitySchema
);