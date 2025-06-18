import { escape } from "mysql2";
import { addBillModel, generateMaHoaDon, getAllBillModel } from "../models/billModel.js";
import { addBillServiceModel } from "../models/billServiceModel.js";
import { getAllContractModel } from "../models/contractModel.js";

const createBill = async (req, res) => {
  try {
    const { MaPhong, infService } = req.body; 
    let tongtien= 0;
    for(const service of infService){
      tongtien += service.DonGia * service.SoLuong
    }

    const allContract = await getAllContractModel(MaPhong);
    const MaHoaDon = await generateMaHoaDon()
    for (const contract of allContract) {
      await addBillModel(contract.MaHD, MaHoaDon, tongtien);

      for (const service of infService) {
        await addBillServiceModel(MaHoaDon, service);
      }
    }

    return res.status(200).json({ message: "tạo hóa đơn thành công" });
  } catch (err) {
    return res.status(500).json({ message: "lỗi khi tạo hóa đơn", err });
  }
};

const getAllBill = async (req, res) => {
  try {
    getAllBillModel((err, result) => {
      if(err) return res.status(500).json({message:"ko lay dc danh sach bill", err:err})
      else return res.status(200).json({message:"lay thanh cong",result:result})
    })
  } catch (error) {
    return res.status(500).json({ message: "lỗi khi tạo hóa đơn", err });
  }
}

export { createBill, getAllBill };
