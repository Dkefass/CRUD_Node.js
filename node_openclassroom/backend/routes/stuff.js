const express=require("express")
const router=express.Router()
const stuffCtrl = require("../controller/stuff")


router.delete('/:id',stuffCtrl.deleteThing)
router.put('/:id',stuffCtrl.modifyThing)
router.post('/', stuffCtrl.createThing)
  
router.get('/:id',stuffCtrl.getOnething)
  
router.get('/',stuffCtrl.getAllThing)

    module.exports=router;