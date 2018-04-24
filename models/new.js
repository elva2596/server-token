const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//   title_cn:"",
//   title_en:"",
//   place_cn:"",
//   place_en:"",
//   coverUrl:"",
//   content_cn:"",
//   content_en:""
// }
const newSchema = new Schema({
    title_cn:String,
    title_en:String,
    place_cn:String,
    place_en:String,
    coverUrl:String,
    content_cn:String,
    content_en:String
})
const NewModel = mongoose.model("New",newSchema);
module.exports = NewModel
