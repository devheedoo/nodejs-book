const mongoose = require('mongoose');

const { Schema } = mongoose;

// 가능한 자료형
// - String, Number, Boolean
// - Date, Buffer, Mixed, ObjectId, Array
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age : {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,  // 옵션이 필요하지 않다면 자료형만 간단히 표기
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
// 몽구스는 컬렉션명을 자동으로 변경해서 생성한다.
// User -> users, Comment -> comments