import {
  cancelContractModel,
  checkStudentRoomModel,
  createContractModel,
  extendContractModel,
  generateMaHD,
  getAllContractModel,
  getContractModel,
} from "../models/contractModel.js";
import {
  getCapacityRoomNow,
  updateHistoryStudentRoom,
} from "../models/historyStudentRoomModel.js";
import { getCapacityRoomModel } from "../models/roomModel.js";

const checkCapacityRoom = async (MaPhong) => {
  const sucChua = await getCapacityRoomModel(MaPhong);
  const soSVHT = await getCapacityRoomNow(MaPhong);
  if (sucChua === 0) return -1;
  if (parseInt(sucChua) > parseInt(soSVHT)) return 1;
  return 0;
};

const createContract = async (req, res) => {
  try {
    const { MaSV, MaPhong, MaQl, TenHD } = req.body;
    const MaHD = await generateMaHD();
    const NgayLap = new Date();
    const NgayHetHan = new Date(NgayLap);
    NgayHetHan.setMonth(NgayHetHan.getMonth() + 3);

    const checkCapa = await checkCapacityRoom(MaPhong);
    if (checkCapa === 0)
      return res.status(500).json({
        message: "so sinh vien trong phong da day.Vui long chon phong khac!",
      });
    if (checkCapa === -1)
      return res.status(500).json({
        message: "phong khong ton tai!",
      });
    const check = await checkStudentRoomModel(MaSV);
    if (check === null)
      return res
        .status(500)
        .json({ message: "sv da co phong, vui long roi khoi phong" });
    createContractModel(
      MaSV,
      MaPhong,
      MaQl,
      MaHD,
      NgayLap,
      NgayHetHan,
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: "ko tao dc hop dong", error: err });
        updateHistoryStudentRoom(MaPhong, MaSV, "add", (err, result) => {
          if (err)
            return res.status(500).json({
              message: "ko cap nhat dc lich su them sinh vien vao phong",
              error: err,
            });
          else
            return res
              .status(200)
              .json({ message: "cap nhat lich su thanh cong", result: result });
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "loi he thong", error: error });
  }
};

const cancelContract = async (req, res) => {
  try {
    const { MaPhong, MaSV } = req.query;
    cancelContractModel(MaSV, MaPhong, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "ko huy hop dong dc", error: err });
      updateHistoryStudentRoom(MaPhong, MaSV, "cancel", (err, result) => {
        if (err)
          return res.status(500).json({
            message: "ko cap nhap dc lich su so sinh vien phong",
            err: err,
          });
        else
          return res
            .status(200)
            .json({ message: "cap nhat lich su thanh cong", result: result });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "loi he thong", error: error });
  }
};

const extendContract = async (req, res) => {
  try {
    const { MaHD } = req.query;
    const NgayLap = new Date();
    const NgayHetHan = new Date(NgayLap);
    NgayHetHan.setMonth(NgayHetHan.getMonth() + 3);

    const contract = await getContractModel(MaHD);
    const NgayHetHanCu = new Date(contract.NgayHetHan);

    const diffTime = NgayLap.getTime() - NgayHetHanCu.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < -3 || diffDays > 3) {
      return res.status(400).json({
        message:
          "Không thể gia hạn: Ngày lập không nằm trong khoảng ±3 ngày so với ngày hết hạn cũ.",
      });
    }
    extendContractModel(NgayLap, NgayHetHan, MaHD, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Không gia hạn được", error: err });
      } else {
        return res
          .status(200)
          .json({ message: "Gia hạn thành công", result: result });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống", error: error });
  }
};

const getAllContract = async (req, res) => {
  try {
    const hopdong = await getAllContractModel();
    if (!hopdong)
      return res.status(404).json({ message: "ko lay dc hop dong" });
    return res
      .status(200)
      .json({ message: "lay danh sach thanh cong", hopdong: hopdong });
  } catch (error) {
    return res.status(500).json({ message: "loi he thong", error: error });
  }
};
export { createContract, extendContract, cancelContract, getAllContract };
