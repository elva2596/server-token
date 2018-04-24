// {
//   content_cn:"",
//   content_en:"",
//   title_cn:"",
//   title_en:"",
//   time_cn:"",
//   time_en:""
// }
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const textSchema = new Schema({
  content_cn:String,
  content_en:String,
  tittle_cn:String,
  tittle_en:String,
  time_cn:String
})
const TextModel = mongoose.model("Text",textSchema);
module.exports = TextModel
