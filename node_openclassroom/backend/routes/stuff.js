const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const stuffCtrl = require("../controller/stuff")
const multer= require("multer")


router.delete('/:id',auth,stuffCtrl.deleteThing)
router.put('/:id',auth,stuffCtrl.modifyThing)
router.post('/',auth,multer, stuffCtrl.createThing)
  
router.get('/:id',auth,stuffCtrl.getOnething)
  
router.get('/',auth,stuffCtrl.getAllThing)

    module.exports=router;