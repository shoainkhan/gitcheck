const { UUID } = require('bson');
const { Binary } = require('mongodb');
const mongoose = require('mongoose');
// const {v4 : uuidv4} = require('uuid')
const MUUID = require('uuid-mongodb');

// const dataSchema = new mongoose.Schema({
//     name: {
//         required: true,
//         type: String
//     },
//     age: {
//         required: true,
//         type: Number
//     }
// })


const customerSchema = new mongoose.Schema({
  
  first_name:{
    required : true,
    type: String
  },
  last_name:{
      required : true,
      type : String
  },
  email:{
      required : true,
      type : String
  },
  phone_number:{
      required : true,
      type : Number
  },
  age:{
      required:true,
      type:Number
  },
  address:{
      street:{
          required: true,
          type:String
      },
      zip:{
          required:true,
          type:Number   
      },
      city:{
          type:String,
          required:true
      }

  }
})

const shopSchema = new mongoose.Schema({
    shopId:{
        required : true,
        type : String
    },
    shopName:{
        required:true,
        type:String
    },
    shopAddress:{
        required: true,
        type:String        
    }
})

const Customer = mongoose.model('customer',customerSchema);
const Shop = mongoose.model('shop',shopSchema);

module.exports = {
    Customer,Shop
}
// module.exports = mongoose.model('Data', dataSchema)