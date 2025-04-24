import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type: String},
    role :{ type:String,
         enum: ["Costomer", "Admin", "DeliveryPartner"],
         required: true,
    },
    isActived: { type: Boolean, default: false },
})



//costmer

const costmerSchema = new mongoose.Schema({
...userSchema.obj,
phone: { type: Number, required: true ,unique: true },
role :{ type:String, enum: ["Costomer"], default: "Costomer" },
liveLocation: {
latitude: { type: Number },
longitude: { type: Number },
},
addreess: {type: String,}

});
//delever patner srchoma
const deliveryPartnerSchema = new mongoose.Schema({
...userSchema.obj,
email: { type: String, required: true ,unique: true },
password: { type: String, required: true },
phone: { type: Number, required: true},
role :{ type:String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
liveLocation: {
latitude: { type: Number },
longitude: { type: Number },
},
addreess: {type: String},
 
branch: {type:mongoose.Schema.Types.ObjectId, 
    ref: "Branch"}
});


//admin sechoma
const adminSchema = new mongoose.Schema({
...userSchema.obj,
email: { type: String, required: true ,unique: true },
password: { type: String, required: true },
role :{ type:String, enum: ["Admin"], default: "Admin" },
});


export const Costmer = mongoose.model("Costmer", costmerSchema);
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export const Admin = mongoose.model("Admin", adminSchema);
 