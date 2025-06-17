import { connection } from "../config/connectDb.js";

const addBillServiceModel = (MaHoaDon, service) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO hoadon_dichvu(MaHoaDon, MaDV, SoLuong, DonGia) VALUES (?, ?, ?, ?)";
      connection.query(sql, [MaHoaDon, service.MaDV, service.SoLuong, service.DonGia], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };

export {addBillServiceModel}