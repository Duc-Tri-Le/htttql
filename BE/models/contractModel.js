import { connection } from "../config/connectDb.js";

const generateMaHD = async () => {
  const sql = "SELECT MaHD FROM hopdong ORDER BY MaHD DESC LIMIT 1";
  const [rows] = await connection.promise().query(sql);
  if (rows.length === 0) return "HD001";

  const lastMaHD = rows[0].MaHD; 
  const numberPart = parseInt(lastMaHD.slice(2)); 
  const newNumber = numberPart + 1;
  const newMaHD = "HD" + newNumber.toString().padStart(3, "0");
  return newMaHD; 
};

const createContractModel = async (
  MaSV,
  MaPhong,
  MaQl,
  MaHD,
  TenHD,
  NgayLap,
  NgayHetHan,
  callback
) => {
  const sql =
    "INSERT INTO hopdong(MaSV, MaPhong, MaQl, MaHD, TenHD, NgayLap, NgayHetHan) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [MaSV, MaPhong, MaQl, MaHD, TenHD, NgayLap, NgayHetHan],
    (err) => {
      if (err) return callback(err);
      else return callback(null)
    }
  );
};

const cancelContractModel = async(MaSV,MaPhong, callback) => {
    const sql = "DELETE FROM hopdong WHERE MaSV = ? AND MaPhong = ?"
    connection.query(sql,[MaSV, MaPhong], (err) => {
        if(err) return callback(err)
        else return callback(null)
    })
}

export { createContractModel, generateMaHD, cancelContractModel };
