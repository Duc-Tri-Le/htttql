import { connection } from "../config/connectDb.js";

const generateMaHoaDon = async () => {
  const sql = "SELECT MaHoaDon FROM hoadon ORDER BY MaHoaDon DESC LIMIT 1";
  const [rows] = await connection.promise().query(sql);
  if (rows.length === 0) return "HDN001"; // tránh trùng với MaHD

  const lastMaHoaDon = rows[0].MaHoaDon;
  const numberPart = parseInt(lastMaHoaDon.replace(/\D/g, ""));
  const newNumber = numberPart + 1;
  return "HDN" + newNumber.toString().padStart(3, "0");
};

const addBillModel = (MaHD, MaHoaDon) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO hoadon(MaHD, MaHoaDon) VALUES (?, ?)";
    connection.query(sql, [MaHD, MaHoaDon], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
export { addBillModel, generateMaHoaDon };
