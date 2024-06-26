import mongoose from 'mongoose';

const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(
      // 빨간색으로 표시된 부분은 대여한 ID, Password, 주소에 맞게끔 수정해주세요!
      process.env.dbUrl,
      {
        dbName: process.env.dbName, // node_lv1 데이터베이스명을 사용합니다.
      }
    )
    .then(() => console.log('MongoDB is Connected.'))
    .catch((err) => console.log(`Failed MongoDB Connected . ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('Error MongoDB Conencted', err);
});

export default connect;
