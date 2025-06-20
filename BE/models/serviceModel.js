import { connection } from "../config/connectDb.js";

const generateMaDV = async () => {
  const sql = "SELECT MaDV FROM dichvu ORDER BY MaDV DESC LIMIT 1";
  const [rows] = await connection.promise().query(sql);
  if (rows.length === 0) return "DV001";

  const lastMaDV = rows[0].MaDV;
  const numberPart = parseInt(lastMaDV.slice(2));
  const newNumber = numberPart + 1;
  return "DV" + newNumber.toString().padStart(3, "0");
};

const addServiceModel = async (MaDV, service, callback) => {
  const { TenDV, GiaDV, units } = service;
  const sql = "INSERT INTO dichvu(MaDV, TenDV, GiaDV, units) VALUES(?,?,?,?)";
  connection.query(sql, [MaDV, TenDV, GiaDV, units], (err) => {
    if (err) return callback(err);
    const selectSql = "SELECT * FROM dichvu WHERE MaDV = ?";
    connection.query(selectSql, [MaDV], (err2, rows) => {
      if (err2) return callback(err2);
      if (rows.length === 0) return callback(null, null);
      return callback(null, rows[0]); 
    });
  });
};

const updateServiceModel = async (MaDV, updateIfService, callback) => {
  const fields = Object.keys(updateIfService);
  const values = Object.values(updateIfService);
  if (fields.length === 0) {
    return callback(new Error("ko co cap nhat moi"));
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  values.push(MaDV);

  const sql = `UPDATE dichvu SET ${setClause} WHERE MaDV = ?`;
  connection.query(sql, values, (err, result) => {
    if (err) return callback(err);
    const selectSql = "SELECT * FROM dichvu WHERE MaDV = ?";
    connection.query(selectSql, [MaDV], (err2, rows) => {
      if (err2) return callback(err2);
      if (rows.length === 0) return callback(null, null);
      return callback(null, rows[0]); 
    });
  });
};

const deleteServiceModel = async (MaDV, callback) => {
  const sql = "DELETE FROM dichvu WHERE MaDV = ?";
  connection.query(sql, [MaDV], (err, result) => {
    if (err) return callback(err);
    else if (result) return callback(null, result);
  });
};

const allServiceModel = async (callback) => {
  const sql = "SELECT * FROM dichvu";
  connection.query(sql, (err, result) => {
    if (err) return callback(err);
    else if (result) return callback(null, result);
  });
};

export {
  addServiceModel,
  updateServiceModel,
  deleteServiceModel,
  allServiceModel,
  generateMaDV,
};
