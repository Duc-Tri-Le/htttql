import { connection } from "../config/connectDb.js";

const generateMaPhong = async () => {
  const sql = "SELECT MaPhong FROM phong ORDER BY MaPhong DESC LIMIT 1";
  const [rows] = await connection.promise().query(sql);
  if (rows.length === 0) return "P001";

  const lastMaPhong = rows[0].MaPhong;
  const numberPart = parseInt(lastMaPhong.replace(/\D/g, "")); // lấy số cuối
  const newNumber = numberPart + 1;
  return "P" + newNumber.toString().padStart(3, "0");
};

const addRoomModel = async (room, callback) => {
  const { MaPhong, SucChua, GiaPhong, MaDayPhong } = room;
  const sql =
    "INSERT INTO phong(MaPhong,SucChua,GiaPhong,MaDayPhong) VALUES (?,?,?,?,?)";
  connection.query(
    sql,
    [MaPhong, TenPhong, SucChua, GiaPhong, MaDayPhong],
    (err) => {
      if (err) return callback(err);
      else return callback(null);
    }
  );
};

const updateRoomModel = async (MaPhong, updateIfRoom, callback) => {
  const fields = Object.keys(updateIfRoom);
  const values = Object.values(updateIfRoom);
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE phong SET ${setClause} WHERE MaPhong =?`;
  connection.query(sql, [...values, MaPhong], (err) => {
    if (err) return callback(err);
    const sql2 = "SELECT * FROM phong WHERE MaPhong =?";
    connection.query(sql2, [MaPhong], (err2, result) => {
      if (err2) return callback(err2);
      else return callback(null, result[0]);
    });
  });
};

const deleteRoomModel = async (MaPhong, callback) => {
  const sql = "DELETE FROM phong WHERE MaPhong = ?";
  connection.query(sql, [MaPhong], (err, result) => {
    if (err) return callback(err);
    else return callback(null, result);
  });
};

const getAllRoomModel = async (callback) => {
  const sql = "SELECT * FROM phong";
  connection.query(sql, (err, result) => {
    if (err) return callback(err);
    else return callback(null, result);
  });
};

const getCapacityRoomModel = async (MaPhong) => {
  const sql = "SELECT SucChua FROM phong WHERE MaPhong = ?";
  const [rows] = await connection.promise().query(sql, [MaPhong]);
  const SucChua = rows.length > 0 ? rows[0].SucChua : 0;
  return SucChua;
};

const getAllContractRoomModel = async (MaPhong, MaSV) => {
  const sql = "SELECT MaHD FROM phong WHERE MaPhong = ?";
  const [hopdong] = await connection.promise().query(sql, [MaPhong]);
  return hopdong.length > 0 ? hopdong : 0;
};

export {
  getAllRoomModel,
  deleteRoomModel,
  addRoomModel,
  updateRoomModel,
  getCapacityRoomModel,
  getAllContractRoomModel,
  generateMaPhong,
};
