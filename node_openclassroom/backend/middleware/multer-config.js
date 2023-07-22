const multer=require("multer")
 
const MIME_TYPES=
{
    'images/jpg':'jpg',
    'images/jpeg':'jpeg',
    'images/png':'png',
}

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'images')//(nom du dossier 'images' ,null pour signaler qu'il n y a pas d'erreur)
    },
    filename:(req,file,callback)=>{
        const name=file.originalname.split(' ').join('_')//remplacage des espace ' ' dans le nom du fichier  par le '_' 
        const extension=MIME_TYPES[file.mimetype]
        callback(null,name+Date.now+'.'+extension)
    }
})

module.exports=multer({storage}).single('image')