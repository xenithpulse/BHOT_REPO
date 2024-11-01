import mongoose, {model, Schema, models} from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  // Add other fields if necessary
});

export const Category = models?.Category || model('Category', CategorySchema);