const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // ObjectId Type 정의
const commentSchema = new Schema({
  commenter: {
    type: ObjectId, // document 생성 시 같이 생성되는 고유값
    required: true,
    ref: 'User',  // User 스키마의 사용자 ObjectId 값임을 명시
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);