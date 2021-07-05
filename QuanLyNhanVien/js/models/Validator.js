function Validator() {
  this.kiemTraDoDaiKyTu = function (value, spanID, mess, min, max) {
    // falsy value: 0, '', "", ``, null, undefined, false, NaN (Not a Number)
    // còn lại là truthy value
    if (value.length >= min && value.length <= max) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  //kiếm tra chuỗi
  this.kiemTraChuoi = function (value, spanID, mess) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );
    if (pattern.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  //kiemr tra email

  this.kiemTraEmail = function (value, spanID, mess) {
    var checkMail = new RegExp(
      "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$"
    );
    if (checkMail.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  //kiếm tra mật khẩu
  this.kiemTraMatKhau = function (value, spanID, mess) {
    var checkPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$"
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
    );
    if (checkPassword.test(value)) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      console.log("abc");
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    console.log("sai");
    return false;
  };

  // kiếm tra lương cb
  this.kiemTraLuongCB = function (value, spanID, mess, min, max) {
    if (value >= min && value <= max) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  //kiếm tra chức vụ
  this.kiemTraChucVu = function (value, spanID, mess) {
    if (value === "Sếp" || value === "Trưởng phòng" || value === "Nhân viên") {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };

  //kiểm tra giờ làm
  this.kiemTraGioLam = function (value, spanID, mess, min, max) {
    if (value >= min && value <= max) {
      getEle(spanID).style.display = "none";
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };
}
