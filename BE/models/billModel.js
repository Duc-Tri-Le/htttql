import { connection } from "../config/connectDb.js";

const generateMaHoaDon = async () => {
  const sql = "SELECT MaHoaDon FROM hoadon ORDER BY MaHoaDon DESC LIMIT 1";
  const [rows] = await connection.promise().query(sql);
  if (rows.length === 0) return "HDN001"; 

  const lastMaHoaDon = rows[0].MaHoaDon;
  const numberPart = parseInt(lastMaHoaDon.replace(/\D/g, ""));
  const newNumber = numberPart + 1;
  return "HDN" + newNumber.toString().padStart(3, "0");
};

const addBillModel = (MaHD, MaHoaDon, tongtien) => {
  return new Promise((resolve, reject) => {
    const ngaylap = new Date()
    const sql = "INSERT INTO hoadon(MaHD, MaHoaDon, ngaylap, tongtien) VALUES (?, ?,?,?)";
    connection.query(sql, [MaHD, MaHoaDon,ngaylap,tongtien], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getAllBillModel = (callback) => {
  SELECT 
      `hoadon.MaPhong, 
      hoadon.TongTien, 
      hoadon.NgayLap, 
      hopdong.MaPhong 
    FROM hoadon 
    JOIN hopdong ON hoadon.MaHD = hopdong.MaHD`
  connection.query(sql,(err, result) => {
    if(err) return callback(err);
    else return callback(null, result)
  })
}
export { addBillModel, generateMaHoaDon , getAllBillModel};
