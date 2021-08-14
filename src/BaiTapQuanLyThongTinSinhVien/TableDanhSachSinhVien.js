import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableDanhSachSinhVien extends Component {

    state = {
        search: ''
    }

    updateSearch = (event) => {
        this.setState({
            search: event.target.value.substr(0,20)
        });
    }

    render() {

        let { maSV, hoTen, soDienThoai, email } = this.props.mangSinhVien;

        // Tìm kiếm thông tin sinh viên dựa trên tên sinh viên
        let filter = this.props.mangSinhVien.filter((sv)=>{
            return sv.hoTen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });


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
                                <input type="text" placeholder=" Tìm họ tên sinh viên" value={this.state.search}
                                    style={{position:'relative',width:'300px',height:'40px',padding:'5px',border:'none'}}
                                    onChange={this.updateSearch.bind(this)} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map((sinhVien, index) => {
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