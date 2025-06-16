import {
  cancelContractModel,
  createContractModel,
  generateMaHD,
} from "../models/contractModel.js";
import {
  getCapacityRoomNow,
  updateHistoryStudentRoom,
} from "../models/historyStudentRoomModel.js";
import { getCapacityRoomModel } from "../models/roomModel.js";

const checkCapacityRoom = async (MaPhong) => {
  console.log("bat dau check");
  const sucChua = await getCapacityRoomModel(MaPhong);
  const soSVHT = await getCapacityRoomNow(MaPhong);
  if (parseInt(sucChua) > parseInt(soSVHT)) return 1;
  return 0;
};

const createContract = async (req, res) => {
  try {
    const { MaSV, MaPhong, MaQl, TenHD } = req.body;
    const MaHD = await generateMaHD();
    const NgayLap = new Date();
    const NgayHetHan = new Date(NgayLap);
    NgayHetHan.setFullYear(NgayHetHan.getFullYear() + 1);

    const checkCapa = await checkCapacityRoom(MaPhong);
    if (!checkCapa)
      return res.status(500).json({
        message: "so sinh vien trong phong da day.Vui long chon phong khac!",
      });

    createContractModel(
      MaSV,
      MaPhong,
      MaQl,
      MaHD,
      TenHD,
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

const extendContract = async () => {};

export { createContract, extendContract, cancelContract };
