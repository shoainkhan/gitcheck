const express = require('express');
const model = require('../models/model');
const Model = require('../models/model');
const { Customer, Shop } = require('../models/model');
const {v4 : uuidv4} = require('uuid')
const MUUID = require('uuid-mongodb');

const router = express.Router();
//Post Method
router.post('/addCustomer', async (req, res) => {
    // res.send('Post API')
    // const data = new Model({
    //   name: req.body.name,
    //   age: req.body.age
    // let id = uuidv4();
    // console.log(id);
    // let uuid = MUUID.from(id);
    // console.log(uuid)    ;
    // const data = new Customer({
    //     // _id: uuid,
    //     first_name:req.body.first_name,
    //     last_name : req.body.last_name,
    //     email: req.body.email,
    //     phone_number: req.body.phone_number,
    //     age:req.body.age,
    //     "address.street":req.body.street,
    //     zip:req.body.zip,
    //     city:req.body.city
    //     // address.street: req.body.street
    // })
    try {
    let insertData = await Customer.create({
        first_name:req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        age:req.body.age,
        address:{ street:req.body.street,zip:req.body.zip,city:req.body.city}
    })
        // const datatosave = await data.save();
        res.status(200).json({
            "Message":'Customer Added SuccessFully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
})

router.post('/getCustomer', async (req,res)=>{
  try {
    //   console.log(req.params.id);
      let getData = await Customer.find({
        $or:[
        {"first_name":req.body.first_name},
        {"last_name":req.body.last_name},
        {"age":{$gte:26}}
        ]
      })
//       find({"likes": {$gt:10}, $or: [{"by": "tutorials point"},
//    {"title": "MongoDB Overview"}]})
       getData =await Customer.find({"age":26,$or:[
          {"first_name":req.body.first_name},
          {"last_name":req.body.last_name}
      ]});

      res.status(200).json(getData);
  } catch (error) {
      res.status(500).json(error.message);
  }
})

router.get('/getCustomer', async(req,res) =>{
  try {
    let limitEx = await Customer.find({},{first_name : 1,last_name : 1, _id :0}).limit(2);
    res.status(200).json(limitEx);    
  } catch (error) {
    res.status(500).json(error.message);
  }
})   

router.put('/updateCustomer/:id', async(req,res) =>{
    let id = req.params.id;
    let updateData = await Customer.updateOne({"_id":req.params.id},
    {$set:{'first_name':req.body.first_name}})
    // console.log(updateData.save());
    
    let updateAllAges = await Customer.updateMany({$set:{"age":00}});
    res.status(200).json(updateAllAges);
})

router.delete('/deleteCustomer/:id', async(req,res) =>{
    try {
        let id = req.params.id;
        let removeData = await Customer.remove({"_id":id})
        res.status(200).json(removeData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    // res.send('Get All API')
    try {
    //   const data = await Customer.find({},{"first_name" : 1,_id:0}).sort({"first_name":-1});
    // let data = await Customer.createIndexes({"first_name":1,"last_name":-1});
    // let data = await Customer.aggregate([{$group :{_id: "age", sum_of_ages : {$sum: "$age"}}}]);
    // let data = await Customer.aggregate([{$group :{_id: "age", avg_of_ages : {$avg: "$age"}}}]);
    // let data = await Customer.aggregate([{$group:{_id: "age", min_of_ages : {$min: "$age"}}}]);
    // let data = await Customer.aggregate([{$group:{_id: "age", max_of_ages : {$max: "$age"}}}]);

    //count number of records in the documents
    // let data = await Customer.aggregate([{
    //     $group: {
    //       _id: "first_name",
    //       num_of_records : { $count: { }}
    //     }
    // }])

    //group by for fetching distinct records
    // let data = await Customer.aggregate( [ { $group : { _id : "$first_name"}}]);
    

    //group by having example
    // let data = await Customer.aggregate([{$group : {
	//  _id : "$first_name",num_of_age : { $sum : "$age"}}},
    // { $match:{ "num_of_age":{ $gte :22}}}]);
    // let data = await Customer.aggregate([{$group:{_id: "ID",push_group : {$push:{
    //     first_name:"$first_name",
    //     last_name:"$last_name",
    //     age:"$age"
    // }}}}])

	// let data = await Customer.aggregate([
	// 	{"$group" : { _id:"$first_name",count:{$sum:1}}}
	// ])

	// let data = await Customer.aggregate([
	// 	{
	// 	$group:
	// 	{
	// 	  _id : "age",
	// 	  customerDetails: { $push: {first_name:"$first_name",last_name:"$last_name"}}
	// 	}	 
	//   }
	// ])

    //include Specfic fields using project
    // let data = await Customer.aggregate([{ $project : {_id : 0 , first_name : 1 , age : 1}}]);

    //excluding fields from output doucments
    // let data = await Customer.aggregate([{ $project : {"last_name" : 0, "age" : 0}}]);
    

    //excluding fields from embedded documentst
    // let data = await Customer.aggregate([{$project: {"address.zip" : 0, "email" : 0}}]);

    //Conditionally Excluding fields 
    // let data = await Customer.aggregate([
    //     {
    //       $project : {
    //         "first_name":1,
    //         "phone_number":1,
    //         "address.street":1,
    //         "address.city":{
    //           $cond: {
    //             if:{ $eq: ["DEWAS","$address.city"]},
    //             then: "$$REMOVE",
    //             else: "$address.city" 
    //           }
    //         }
    //       }
    //     }
    // ])

    //including specific fields from embedded documents
    let data = await Customer.aggregate([{
        $project:{
          "address.city":1,
          "address.street":1,
          "first_name":1,
          "email":1,
          "phone_number":1
        }
    }])

    res.json(data);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    // res.send('Get by ID API')
    const data = await Model.findById(req.params.id);
    res.json(data);
})

//Update by ID Method
router.patch('/update/:id', async(req, res) => {
    // res.send('Update by ID API')
    try {
      const id = req.params.id;
      const updateData = req.body;
      const options = { new : true };

      const result = await Model.findByIdAndUpdate(
          id, updateData, options
      )
      res.send(result);
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;