import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDanhSachSinhVien from './TableDanhSachSinhVien'

export default class BaiTapQuanLyThongTinSinhVien extends Component {
    render() {
        return (
            <div className="container">
                <FormDangKy />
                <TableDanhSachSinhVien />
            </div>
        )
    }
}
