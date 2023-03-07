const express = require('express');
const router = express.Router();
const trucks = require("../models/trucks")

router.post('/',(req,res)=>{
    var data = req.body
    var plateNo = data.plateNo;
    var make = data.make
   
    if(plateNo==''|| make==''){
        console.log("missing field")
        res.status(403).send({message:"missing field"})
      }else{
        var truckData = new trucks({
            plateNo,make
        })
        truckData.save();
        res.status(200).send({"message":"done"})
      }
})

router.post('/updatedriver',(req,res)=>{
  var data = req.body
  var plateNo = data.plateNo;
  var driver = data.driver
 
  if(plateNo==''|| driver==''){
      console.log("missing field")
      res.status(403).send({message:"missing field"})
    }else{
      trucks.findOne({plateNo:plateNo},(err,_truck)=>{
        if(err){
          console.log(err)
          res.status(505).send({"message":"server error"})
        }else{
          _truck.driver=driver
          _truck.save()
          res.status(200).send({"message":"done"})
        }
      })

    }
})

router.get('/manage',(req,res)=>{
  var data = req.query
  var id = data.id
  console.log(id)
  trucks.find({plateNo:id}).then(_res=>{
    console.log(_res)
    res.status(200).send({message:"done",truck: _res[0]})
  })
})

router.get('/',(req,res)=>{
  trucks.find().exec().then(_res=>{
    console.log(_res)
    res.status(200).send({trucks:_res})
  })
})


router.get('/fetchtruck',(req,res)=>{
  var data = req.query
  var id = data.id
  console.log('driver id')
  console.log(id)
  trucks.find({driver:id}).then(_res=>{
    console.log(_res)
    res.status(200).send({message:"done",truck: _res[0]})
  })
})

module.exports = router;