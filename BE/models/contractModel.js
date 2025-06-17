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

const checkStudentRoomModel = async (MaSV) => {
  const sql = "SELECT MaPhong FROM hopdong WHERE MaSV = ?";
  const maphong = await connection.promise().query(sql, [MaSV])
  return maphong.length > 0 ? maphong[0].MaPhong : null;
} 

const createContractModel = async (
  MaSV,
  MaPhong,
  MaQl,
  MaHD,
  NgayLap,
  NgayHetHan,
  callback
) =>  {
  const sql =
    "INSERT INTO hopdong(MaSV, MaPhong, MaQl, MaHD, NgayLap, NgayHetHan) VALUES (?,?,?,?,?,?)";
  connection.query(
    sql,
    [MaSV, MaPhong, MaQl, MaHD, NgayLap, NgayHetHan],
    (err) => {
      if (err) return callback(err);
      else return callback(null);
    }
  );
};

const cancelContractModel = (MaSV, MaPhong, callback) => {
  const sql = "DELETE FROM hopdong WHERE MaSV = ? AND MaPhong = ?";
  connection.query(sql, [MaSV, MaPhong], (err) => {
    if (err) return callback(err);
    else return callback(null);
  });
};

const extendContractModel = (NgayLap, NgayHetHan, MaHD, callback) => {
  const sql = "UPDATE hopdong SET NgayLap = ?, NgayHetHan = ? WHERE MaHD = ?";
  connection.query(sql,[NgayLap,NgayHetHan,MaHD],(err) => {
    if(err) return callback(err);
    const sql2 = "SELECT * FROM hopdong WHERE MaHD = ?";
    connection.query(sql2,[MaHD], (err, result) => {
      if(err) return callback(err);
      else return callback(null, result);
    });
  })
};

const getAllContractModel = async () => {
  const sql = `SELECT h.MaHD, sv.MaSV, sv.TenSV, sv.email, sv.DiaChi, sv.GioiTinh,sv.SDT,sv.NamSinh,
    p.MaPhong
    FROM hopdong h
    JOIN sinhvien sv ON h.MaSV = sv.MaSV
    JOIN phong p ON h.MaPhong = p.MaPhong`;
  const [hopdong] = await connection.promise().query(sql);
  return hopdong;
};

const getContractModel = async (MaHD) => {
  const sql = `SELECT NgayHetHan FROM hopdong WHERE MaHD = ?`
  const [row] = await connection.promise().query(sql, [MaHD])
  return row[0].NgayHetHan
}

export { createContractModel, generateMaHD, cancelContractModel, getAllContractModel, extendContractModel, getContractModel, checkStudentRoomModel};
