import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableDanhSachSinhVien extends Component {


    render() {
        let { maSV, hoTen, soDienThoai, email } = this.props.mangSinhVien;
        return (
            <div className="mt-5 text-left">
                <table className="table table-hover">
                    <thead className="bg-dark text-white text-left">
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>
                                {/* <button style={{ fontSize: '25px', borderRadius: '10px' }}>
                                    <i className="fa fa-search"></i>
                                </button> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mangSinhVien.map((sinhVien, index) => {
                            return <tr key={index}>
                                <td>{sinhVien.maSV}</td>
                                <td>{sinhVien.hoTen}</td>
                                <td>{sinhVien.soDienThoai}</td>
                                <td>{sinhVien.email}</td>
                                <td>
                                    <button className="btn btn-danger mr-2" onClick={() => {
                                        const action = {
                                            type: 'XOA_SINH_VIEN',
                                            maSV: sinhVien.maSV
                                        }
                                        this.props.dispatch(action);
                                    }}>Xóa</button>
                                    <button className="btn btn-primary" onClick={() => {
                                        const action = {
                                            type: 'CHINH_SUA_SINH_VIEN',
                                            sinhVienChinhSua: sinhVien
                                        }
                                        this.props.dispatch(action);
                                    }}>Chỉnh sửa</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = (rootReducer) => {
    return {
        mangSinhVien: rootReducer.baiTapQuanLyThongTinSinhVienReducer.mangSinhVien
    }
}

export default connect(mapStateToProps)(TableDanhSachSinhVien)