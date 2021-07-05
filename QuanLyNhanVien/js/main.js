function getEle(id) {
  return document.getElementById(id);
}

//string tempalte: dùng $
var dsnv = new CongTy();
var validator = new Validator();
var hienThiDanhSachNV = function (DanhSachNhanVien) {
  var content = "";

  DanhSachNhanVien.map(function (nv, index) {
    /**
     * nv: đại diện cho từng object khi duyệt qua mảng
     * index: chính là chỉ số của phần tử trong mảng
     */
    content += `
    <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
            <button class="btn btn-info" onclick="_suaNhanVien('${nv.taiKhoan}')" data-toggle="modal"
            data-target="#myModal">Sửa</button>
            <button class="btn btn-danger"onclick="_xoaNhanVien('${nv.taiKhoan}')" >Xoá</button>
        </td>
    </tr>  
    `;
  });
  getEle("tableDanhSach").innerHTML = content;
};

//Xóa nhân viên. gọi hàm setLocal để reset lại lưu trữ data của web sau khi xóa
function _xoaNhanVien(taiKhoanNV) {
  dsnv.xoaNhanVien(taiKhoanNV);
  hienThiDanhSachNV(dsnv.DanhSachNhanVien);
  setLocalStorage();
}

// nút click hiện popup điền thông tin
getEle("btnThemHome").addEventListener("click", function () {
  getEle("btnThemNVPopup").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
});

// nút click để thêm nv sau khi điền xongg
getEle("btnThemNVPopup").addEventListener("click", function () {
  var taiKhoanNV = getEle("tknv").value;
  var hoTenNV = getEle("name").value;
  var emailNV = getEle("email").value;
  var ngayLamNV = getEle("datepicker").value;
  var matKhauNV = getEle("password").value;
  var luongCoBanNV = getEle("luongCB").value;
  var chucVuNV = getEle("chucvu").value;
  var gioLamTrongThangNV = getEle("gioLam").value;
  var tongLuongNV = 0;
  var xepLoaiNV;

  // cách tính lương
  if (chucVuNV === "Sếp") {
    tongLuongNV = luongCoBanNV * 3;
  } else if (chucVuNV === "Trưởng phòng") {
    tongLuongNV = luongCoBanNV * 2;
  } else {
    tongLuongNV = luongCoBanNV;
  }

  //cách tính xếp loại nhân viên
  if (gioLamTrongThangNV >= 192) {
    xepLoaiNV = "Xuất sắc";
  } else if (gioLamTrongThangNV >= 176) {
    xepLoaiNV = "Giỏi";
  } else if (gioLamTrongThangNV >= 160) {
    xepLoaiNV = "Khá";
  } else if (gioLamTrongThangNV < 160) {
    xepLoaiNV = "Trung bình";
  } else if (gioLamTrongThangNV === " ") {
    xepLoaiNV = "Trống";
  }
  // Kiếm tra giá trị validate

  var isValid = true;

  isValid &= validator.kiemTraDoDaiKyTu(
    taiKhoanNV,
    "tbTKNV",
    "(*)Tài khoản phải có độ dài từ 4 đến 6 ký tự và không để trống",
    4,
    6
  );

  isValid &= validator.kiemTraChuoi(
    hoTenNV,
    "tbTen",
    "(*)Họ tên không được chứa số, ký tự đặc biệt,..."
  );

  isValid &= validator.kiemTraEmail(
    emailNV,
    "tbEmail",
    "Vui lòng nhập đúng định dạng<br></br> _không có dấu và các ký tự đặc biệt <br></br> _Email phải có từ 6 ký tự trở lên ,ví dụ: abc@gmail.com !"
  );

  isValid &= validator.kiemTraMatKhau(
    matKhauNV,
    "tbMatKhau",
    "(*)chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống"
  );

  isValid &= validator.kiemTraLuongCB(
    luongCoBanNV,
    "tbLuongCB",
    "(*)Lương cơ bản từ 1.000.000 đồng đến 20.000.000 đồng",
    1000000,
    20000000
  );

  isValid &= validator.kiemTraChucVu(
    chucVuNV,
    "tbChucVu",
    "(*)Vui lòng chọn đúng chức vụ!"
  );

  isValid &= validator.kiemTraGioLam(
    gioLamTrongThangNV,
    "tbGiolam",
    "(*)Giờ làm phải từ 80 đến 200 và không được để trống",
    80,
    200
  );

  if (!isValid) return;

  // khởi tạo đối tượng nhanVien từ lớp đối tượng NhanVien

  var nhanVien = new NhanVien(
    taiKhoanNV,
    hoTenNV,
    emailNV,
    ngayLamNV,
    chucVuNV,
    tongLuongNV,
    xepLoaiNV
  );
  dsnv.themNhanVien(nhanVien);
  hienThiDanhSachNV(dsnv.DanhSachNhanVien);
  setLocalStorage();
});

//Sửa nhân viên
var _suaNhanVien = function (hoTenNV) {
  getEle("btnThemNVPopup").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  var mangTam = dsnv.timViTriNV();
  getEle("tknv").value = mangTam.taiKhoanNV;
  getEle("name").value = hoTenNV;
  getEle("email").value = mangTam.emailNV;
  getEle("datepicker").value = mangTam.ngayLamNV;
  getEle("password").value = mangTam.matKhauNV;
  getEle("luongCB").value = mangTam.luongCoBanNV;
  getEle("chucvu").value = mangTam.chucVuNV;
  getEle("gioLam").value = mangTam.gioLamTrongThangNV;
  setLocalStorage();
};

//Cap nhat nhan vien
getEle("btnCapNhat").addEventListener("click", function () {
  var taiKhoanNV = getEle("tknv").value;
  var hoTenNV = getEle("name").value;
  var emailNV = getEle("email").value;
  var ngayLamNV = getEle("datepicker").value;
  var matKhauNV = getEle("password").value;
  var luongCoBanNV = getEle("luongCB").value;
  var chucVuNV = getEle("chucvu").value;
  var gioLamTrongThangNV = getEle("gioLam").value;
  var tongLuongNV = 0;
  var xepLoaiNV;

  // cách tính lương
  if (chucVuNV === "Sếp") {
    tongLuongNV = luongCoBanNV * 3;
  } else if (chucVuNV === "Trưởng phòng") {
    tongLuongNV = luongCoBanNV * 2;
  } else {
    tongLuongNV = luongCoBanNV;
  }

  //cách tính xếp loại nhân viên
  if (gioLamTrongThangNV >= 192) {
    xepLoaiNV = "Xuất sắc";
  } else if (gioLamTrongThangNV >= 176) {
    xepLoaiNV = "Giỏi";
  } else if (gioLamTrongThangNV >= 160) {
    xepLoaiNV = "Khá";
  } else if (gioLamTrongThangNV < 160) {
    xepLoaiNV = "Trung bình";
  } else if (gioLamTrongThangNV === " ") {
    xepLoaiNV = "Trống";
  }

  var nvmoi = new NhanVien(
    taiKhoanNV,
    hoTenNV,
    emailNV,
    ngayLamNV,
    chucVuNV,
    tongLuongNV,
    xepLoaiNV
  );

  hienThiDanhSachNV(dsnv.DanhSachNhanVien);
  setLocalStorage();
  console.log("123");
});

//tim kiếm nv

getEle("searchName").addEventListener("keyup", function () {
  var mangNV = getLocalStorage();
  var chuoiTK = getEle("searchName").value;

  var mangTK = dsnv.timKiemNV(mangNV, chuoiTK);
  hienThiDanhSachNV(mangTK);
});

// setLocalStorage cho web để hiện thông tin nv đã nhập mà k bị reset khi f5 trang
var setLocalStorage = function () {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.DanhSachNhanVien));
};

var getLocalStorage = function () {
  /**
   * Lấy data từ local storage, chuyển từ chuỗi thành kiểu JSON
   */
  if (localStorage.getItem("DSNV")) {
    dsnv.DanhSachNhanVien = JSON.parse(localStorage.getItem("DSNV"));
    hienThiDanhSachNV(dsnv.DanhSachNhanVien);
  }
};

getLocalStorage();
