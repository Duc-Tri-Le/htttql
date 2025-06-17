import { connection } from "../config/connectDb.js";

const addBillModel =  (MaHD, MaHoaDon, callback) => {
    const sql = "INSERT INTO hoadon(MaHD,MaHoaDon) VALUES(?,?)";
    connection.query(sql,[MaHD,MaHoaDon], (err) => {
        if(err) return callback(err)
        else return callback(null)
    })
}
export {addBillModel}