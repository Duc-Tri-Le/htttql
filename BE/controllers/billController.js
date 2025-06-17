import { addBillModel } from "../models/billModel.js";
import { addBillServiceModel } from "../models/billServiceModel.js";
import { getAllContractModel } from "../models/contractModel.js";

const createBill = async (req, res) => {
  try {
    const { MaPhong, infService, MaHoaDon } = req.body;

    const allContract = await getAllContractModel(MaPhong);

    for (const contract of allContract) {
      await addBillModel(contract.MaHD, MaHoaDon);

      for (const service of infService) {
        await addBillServiceModel(MaHoaDon, service);
      }
    }

    return res.status(200).json({ message: "tạo hóa đơn thành công" });
  } catch (err) {
    return res.status(500).json({ message: "lỗi khi tạo hóa đơn", err });
  }
};

export { createBill };
