import { connection } from "../config/connectDb.js";

const addBillModel = (MaHD, MaHoaDon) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO hoadon(MaHD, MaHoaDon) VALUES (?, ?)";
    connection.query(sql, [MaHD, MaHoaDon], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
export { addBillModel };
