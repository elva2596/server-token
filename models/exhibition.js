const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// {
//   title_cn:"",
//   title_en:"",
//   place_cn:"",
//   place_en:"",
//   create_time:"",
//   coverUrl:"",
//   desc_cn:"",
//   desc_en:"",
// }
const exhSchema = new Schema({
  title_cn:String,
  title_en:String,
  place_cn:String,
  place_en:String,
  coverUrl:String,
  create_time:String,
  desc_cn:String,
  desc_en:String
})
const ExhModel = mongoose.model("Exhibition",exhSchema);
module.exports = ExhModel
