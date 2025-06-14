import mysql from "mysql2";

const createAdmin = async () => {

}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "qlktx",
});

const connectDB = async () => {
  connection.connect((err) => {
    if (err) {
      console.error("Lỗi kết nối:", err);
    } else {
      console.log("Kết nối MySQL thành công!");
    }
  });
  await createAdmin();
};

export { connectDB };
