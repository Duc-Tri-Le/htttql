import { addBillModel } from "../models/billModel.js";
import { addBillServiceModel } from "../models/billServiceModel.js";
import { getAllContractModel } from "../models/contractModel.js";

const createBill = async (req, res) => {
    const {MaPhong, infService}  = req.body;
    const allContract = await getAllContractModel(MaPhong);
    allContract.map(contract => {
        addBillModel(contract.MaHD,MaHoaDon, (err) => {
            if(err) return res.status(500).json({message:"ko them dc hoa don", err:err})
            infService.map(service => {
        addBillServiceModel(MaHoaDon, service, (err, result) => {
            if(err) res.status(500).json({message:"ko the them hoadon_dicvu", err:err})
            else res.status(200).json({message:"tao hoa don thanh cong"})
        })})
        })
    })
}

export {createBill}