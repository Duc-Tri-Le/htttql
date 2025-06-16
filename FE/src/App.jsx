import React from "react";
import { useState } from "react";

const App = () => {
  const [student, setStudent] = useState({
    MaSV: "",
    TenSV: "",
    DiaChi: "",
    GioiTinh: "",
    ChucVu: "",
    SDT: "",
    email: "",
    NamSinh: "",
  });

  const [service, setService] = useState({
    MaDV: "",
    TenDV: "",
    GiaDV: "",
    units: "",
  });
  const [rowRoom, setRowRoom] = useState({
    MaDayPhong: "",
    TenDayPhong: "",
    SoPhongCuaDay: "",
  });
  const [room, setRoom] = useState({
    MaDayPhong: "",
    MaPhong: "",
    TenPhong: "",
    SucChua: "",
    GiaPhong: "",
  });

  const changeService = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };
  const changeRowRoom = (e) => {
    const { name, value } = e.target;
    setRowRoom((prev) => ({ ...prev, [name]: value }));
  };
  const changeRoom = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };
  const URL = "http://localhost:4000/api";

  const MaSV = student.MaSV;
  const MaDV = service.MaDV;
  const MaDayPhong = rowRoom.MaDayPhong;
  const MaPhong = room.MaPhong;
  const addRowRoom = async () => {
    const result = await fetch(`${URL}/rowRoom/addRowRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowRoom),
    });
  };
  const updateRowRoom = async () => {
    const result = fetch(
      `${URL}/rowRoom/updateRowRoom?MaDayPhong=${MaDayPhong}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateIfRowRoom),
      }
    );
  };
  const deleteRowRoom = async () => {
    const result = fetch(
      `${URL}/rowRoom/deleteRowRoom?MaDayPhong=${MaDayPhong}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const getAllRowRoom = async () => {
    const result = fetch(`${URL}/rowRoom/getAllRowRoom`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const login = {
    email: "quanly@gmail.com",
    password: "12345678",
  };
  const updateIfService = {
    TenDV: "nuoc2",
    GiaDV: "3000",
  };

  const updateIfRowRoom = {
    TenDayPhong: "dayphong2",
  };
  const updateIfRoom = {
    TenPhong: "phong2",
    GiaPhong: "2.000.000",
  };

  const changeInput = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  const addStudent = async () => {
    const result = fetch("http://localhost:4000/api/user/addStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
  };

  const deleteStudent = async () => {
    const res = fetch("http://localhost:4000/api/user/deleteStudent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ MaSV }),
    });
  };
  const getAllStudent = async () => {
    const result = fetch("http://localhost:4000/api/user/getAllStudent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getByMaSV = async () => {
    const result = fetch(
      `http://localhost:4000/api/user/getStudentMaSV?MaSV=${MaSV}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const addService = async () => {
    const result = fetch(`${URL}/service/addService`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });
  };

  const updateService = async () => {
    const result = fetch(`${URL}/service/updateService?MaDV=${MaDV}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateIfService),
    });
  };

  const deleteService = async () => {
    const result = fetch(`${URL}/service/deleteService?MaDV=${MaDV}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getAllService = async () => {
    const result = fetch(`${URL}/service/getAllService`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateRoom = async () => {
    const result = fetch(`${URL}/room/updateRoom?MaPhong=${MaPhong}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateIfRoom),
    });
  };

  const deleteRoom = async () => {
    const result = fetch(
      `${URL}/room/deleteRoom?MaPhong=${MaPhong}&&MaDayPhong=${room.MaDayPhong}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const Login = async () => {
    const result = fetch(`http://localhost:4000/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
  };

  const addRoom = async () => {
    await fetch(`${URL}/room/addRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });
  };

  const [formData, setFormData] = useState({
    MaSV: "",
    MaPhong: "",
    MaQl: "",
    TenHD: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateContract = async () => {
    try {
      const res = await fetch(`${URL}/contract/createContract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
    } catch (error) {
      alert("Tạo hợp đồng thất bại");
      console.error(error.response?.data || error.message);
    }
  };
  const cancelContract = async () => {
    await fetch(
      `${URL}/contract/cancelContract?MaPhong=${formData.MaPhong}&&MaSV=${formData.MaSV}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div>
      {/* sinh vien */}
      <div>
        <input
          placeholder="MaSV"
          value={student.MaSV}
          name="MaSV"
          onChange={changeInput}
        />
        <input
          placeholder="email"
          value={student.email}
          name="email"
          onChange={changeInput}
        />
        <input
          placeholder="TenSV"
          value={student.TenSV}
          name="TenSV"
          onChange={changeInput}
        />
        <input
          placeholder="DiaChi"
          value={student.DiaChi}
          name="DiaChi"
          onChange={changeInput}
        />
        <input
          placeholder="GioiTinh"
          value={student.GioiTinh}
          name="GioiTinh"
          onChange={changeInput}
        />
        <input
          placeholder="ChucVu"
          value={student.ChucVu}
          name="ChucVu"
          onChange={changeInput}
        />
        <input
          placeholder="SDT"
          value={student.SDT}
          name="SDT"
          onChange={changeInput}
        />
        <input
          placeholder="NamSinh"
          value={student.NamSinh}
          name="NamSinh"
          onChange={changeInput}
        />
        <button onClick={addStudent}>them</button>
        <button onClick={deleteStudent}>xoa</button>
        <button onClick={getAllStudent}>lay tat ca</button>
        <button onClick={getByMaSV}>lay1sv</button>
        <button onClick={Login}>dang nhap</button>
      </div>
      {/* dich vu */}
      <div>
        <input
          placeholder="MaDV"
          name="MaDV"
          value={service.MaDV}
          onChange={changeService}
        />
        <input
          placeholder="TenDV"
          name="TenDV"
          value={service.TenDV}
          onChange={changeService}
        />
        <input
          placeholder="GiaDV"
          name="GiaDV"
          value={service.GiaDV}
          onChange={changeService}
        />
        <input
          placeholder="units"
          name="units"
          value={service.units}
          onChange={changeService}
        />
        <button onClick={addService}>add service</button>
        <button onClick={updateService}>cap nhat service</button>
        <button onClick={deleteService}>xoa dich vu</button>
        <button onClick={getAllService}>lay dich vu</button>
      </div>
      {/* day phong */}
      <div>
        <input
          placeholder="MaDayPhong"
          name="MaDayPhong"
          value={rowRoom.MaDayPhong}
          onChange={changeRowRoom}
        />
        <input
          placeholder="TenDayPhong"
          name="TenDayPhong"
          value={rowRoom.TenDayPhong}
          onChange={changeRowRoom}
        />
        <input
          placeholder="SoPhongCuaDay"
          name="SoPhongCuaDay"
          value={rowRoom.SoPhongCuaDay}
          onChange={changeRowRoom}
        />
        <button onClick={addRowRoom}>them day</button>
        <button onClick={updateRowRoom}>cap nhat day</button>
        <button onClick={deleteRowRoom}>xoa day</button>
        <button onClick={getAllRowRoom}>lay day</button>
      </div>
      {/* phong */}
      <div>
        <input
          placeholder="MaPhong"
          name="MaPhong"
          value={room.MaPhong}
          onChange={changeRoom}
        />
        <input
          placeholder="TenPhong"
          name="TenPhong"
          value={room.TenPhong}
          onChange={changeRoom}
        />
        <input
          placeholder="GiaPhong"
          name="GiaPhong"
          value={room.GiaPhong}
          onChange={changeRoom}
        />
        <input
          placeholder="SucChua"
          name="SucChua"
          value={room.SucChua}
          onChange={changeRoom}
        />
        <input
          placeholder="MaDayPhong"
          name="MaDayPhong"
          value={room.MaDayPhong}
          onChange={changeRoom}
        />
        <button onClick={addRoom}>them phong</button>
        <button onClick={updateRoom}>cap nhat phong</button>
        <button onClick={deleteRoom}>xoa phong</button>
        <button onClick={getAllRowRoom}>lay phong</button>
      </div>
      {/* hop dong */}
      <div>
        <input
          name="MaSV"
          placeholder="Mã sinh viên"
          value={formData.MaSV}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="MaPhong"
          placeholder="Mã phòng"
          value={formData.MaPhong}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="MaQl"
          placeholder="Mã quản lý"
          value={formData.MaQl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="TenHD"
          placeholder="Tên hợp đồng"
          value={formData.TenHD}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreateContract}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Tạo hợp đồng
        </button>
        <button onClick={cancelContract}>huy hop dong</button>
      </div>
    </div>
  );
};

export default App;
