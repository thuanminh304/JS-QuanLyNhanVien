function CongTy() {
  this.DanhSachNhanVien = [];

  //phương thức
  this.themNhanVien = function (nhanVien) {
    this.DanhSachNhanVien.push(nhanVien);
  };
}

//prototype mượn/ kế thừa thuộc tính
//timViTri sẽ kế thừa thuộc tính của CongTy

CongTy.prototype.timViTriNV = function (taiKhoanNV) {
  return this.DanhSachNhanVien.findIndex(function (item) {
    return taiKhoanNV === item.taiKhoan;
  });
};
// thêm thuộc tính xóa nhân viên bằng cách timViTri
CongTy.prototype.xoaNhanVien = function (taiKhoanNV) {
  var viTri = this.timViTriNV(taiKhoanNV);
  if (viTri !== -1) {
    return this.DanhSachNhanVien.splice(viTri, 1);
  }
};

CongTy.prototype.suaNhanVien = function (taiKhoanNV) {
  var suaNV = this.timViTriNV(taiKhoanNV);
  if (suaNV !== -1) {
    return this.DanhSachNhanVien.slice(suaNV, 2);
  }
};

CongTy.prototype.capNhatNV = function (taiKhoanNV, nhanVien) {
  
};

CongTy.prototype.timKiemNV = function (dsnv, chuoiTK) {
  return dsnv.filter(function () {
    return taiKhoan.indexOf(chuoiTK) !== -1;
  });
};
