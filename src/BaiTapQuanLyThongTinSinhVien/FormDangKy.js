import React, { Component } from 'react'
import {connect} from 'react-redux'

class FormDangKy extends Component {

    state = {
        values:{
            maSV: '',
            soDienThoai: '',
            hoTen: '',
            email: ''
        },
        errors:{
            maSV: '',
            soDienThoai: '',
            hoTen: '',
            email: ''
        }
    }

    handleChangeInput = (event) => {
        let {name,value} = event.target;
        let newValues = {...this.props.sinhVien.values}
        newValues[name] = value;

        let attrValue = '';
        let attrNumber = '';
        let minLength = 4;
        let maxLength = 6;
        let minPhoneNumber = 10;
        let maxPhoneNumber = 12;
        let regexEmail;
        let regexNumber;
        

        if(event.target.getAttribute('typeEmail')){
            attrValue = event.target.getAttribute('typeEmail');
            regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        }

        if(event.target.getAttribute('typeNumber')){
            attrNumber = event.target.getAttribute('typeNumber');
            regexNumber = /^[0-9]+$/;
        }

        let newErrors = {...this.props.sinhVien.errors}
        let messageErrors = '';
       
        // Nếu là số
        if(regexNumber){
            if(attrNumber === 'numberId'){
                if(value.length < minLength || value.length > maxLength){
                    messageErrors = name + ` phải từ ${minLength} đến ${maxLength} ký tự !`
                }
            }
            if(attrNumber === 'numberPhone'){
                if(value.length < minPhoneNumber || value.length > maxPhoneNumber){
                    messageErrors = name + ` phải từ ${minPhoneNumber} đến ${maxPhoneNumber} ký tự !`
                }
            }
            if(attrNumber === 'numberPhone' || attrNumber === 'numberId'){
                if(!regexNumber.test(value)){
                    messageErrors = name + ' phải là số !'
                }
            }

            // Nếu là tên
            if(attrNumber === 'name'){
                if(regexNumber.test(value)){
                    messageErrors = name + ' phải là ký tự !'
                }
            }
        }
        
        // Nếu là email
        if(regexEmail){
            if(attrValue === 'email'){
                if(!regexEmail.test(value)){
                    messageErrors = name + ' phải đúng định dạng !';
                }
            }
        }

        // Kiểm tra bỏ trống
        if(value.trim() === ''){
            messageErrors = name + ' không được bỏ trống !'
        }
       
        
        newErrors[name] =  messageErrors;

        // XỬ lý state
        // this.setState({
        //     values: newValues,
        //     errors: newErrors
        // });

        this.props.dispatch({
            type: 'HANDLE_CHANGE_INPUT',
            sinhVien: {
                values: newValues,
                errors: newErrors 
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('state',this.state);
        // Duyệt lỗi sẽ không cho submit
        let valid = true;
        // Bắt buộc tất cả values phải khác rỗng
        for(let key in this.props.sinhVien.values){
            if(this.props.sinhVien.values[key] === ''){
                valid = false;
                break;
            }
        }

        // Bắt buộc tất cả các errors phải bằng rỗng
        for(let key in this.props.sinhVien.errors){
            if(this.props.sinhVien.errors[key] !== ''){
                valid = false;
                break;
            }
        }

        if(!valid){
            alert('Dữ liệu không hợp lệ !');
            return;
        }

        // Cho submit lên giao diện
        const action = {
            type: 'THEM_SINH_VIEN',
            sinhVien: this.props.sinhVien.values 
        }
        this.props.dispatch(action);
    }


    render() {
        let {maSV,hoTen,soDienThoai,email} = this.props.sinhVien.values;
        return (
            <form className="card mt-5" onSubmit={this.handleSubmit}>
                <div className="card-header bg-dark text-white d-flex align-items-center">
                    <h3>Thông tin sinh viên</h3>
                </div>
                <div className="card-body text-left">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <p>Mã SV</p>
                                <input typeNumber="numberId" value={maSV} className="form-control" name="maSV" 
                                onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.sinhVien.errors.maSV}</p>
                            </div>
                            <div className="form-group">
                                <p>Số điện thoại</p>
                                <input typeNumber="numberPhone" value={soDienThoai} className="form-control" name="soDienThoai" 
                                onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.sinhVien.errors.soDienThoai}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p>Họ tên</p>
                                <input typeNumber="name" value={hoTen} className="form-control" name="hoTen"  
                                onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.sinhVien.errors.hoTen}</p>
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input value={email} typeEmail="email" className="form-control" name="email"  
                                onChange={this.handleChangeInput} />
                                <p className="text-danger">{this.props.sinhVien.errors.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-left">
                    <button className="btn btn-success mr-2" type="submit">Thêm sinh viên</button>
                    <button type="button" className="btn btn-primary" type="submit" onClick={()=>{
                        const action = {
                            type: 'CAP_NHAT_SINH_VIEN',
                            sinhVienCapNhat: this.props.sinhVien.values
                        }
                        this.props.dispatch(action);
                    }}>Cập nhật sinh viên</button>
                </div>
            </form>
        )
    }
}


const mapStateToProps = (rootReducer) => {
    return{
        mangSinhVien: rootReducer.baiTapQuanLyThongTinSinhVienReducer.mangSinhVien,
        sinhVienChinhSua: rootReducer.baiTapQuanLyThongTinSinhVienReducer.sinhVienChinhSua,
        sinhVien:  rootReducer.baiTapQuanLyThongTinSinhVienReducer.sinhVien
    }
}

export default connect(mapStateToProps)(FormDangKy)