


const stateDefault = {
    mangSinhVien: [
        {
            maSV: '1',
            hoTen: 'Nguyễn Văn A',
            soDienThoai: '093811111111',
            email: 'nguyenvana@gmail.com'
        },
        {
            maSV: '2',
            hoTen: 'Nguyễn Văn B',
            soDienThoai: '093822232232',
            email: 'nguyenvanb@gmail.com'
        }
    ],

    sinhVienChinhSua:
    {
        maSV: '1',
        hoTen: 'Nguyễn Văn A',
        soDienThoai: '093811111111',
        email: 'nguyenvana@gmail.com'
    },

    sinhVien: {
        values: {
            maSV: '',
            soDienThoai: '',
            hoTen: '',
            email: ''
        },
        errors: {
            maSV: '',
            soDienThoai: '',
            hoTen: '',
            email: ''
        }
    }

}

export const baiTapQuanLyThongTinSinhVienReducer = (state = stateDefault, action) => {
    console.log(action)
    switch (action.type) {

        case 'THEM_SINH_VIEN': {
            state.mangSinhVien = [...state.mangSinhVien, action.sinhVien]

            return { ...state }
        }

        case 'XOA_SINH_VIEN': {
            const mangSinhVienCapNhat = [...state.mangSinhVien];
            state.mangSinhVien = mangSinhVienCapNhat.filter(sinhVien => sinhVien.maSV !== action.maSV)

            return { ...state }
        }

        case 'CHINH_SUA_SINH_VIEN': {
            state.sinhVien.values = action.sinhVienChinhSua;
            state.sinhVien = { ...state.sinhVien }

            return { ...state }
        }

        case 'HANDLE_CHANGE_INPUT': {
            state.sinhVien = action.sinhVien;

            return { ...state }
        }

        case 'CAP_NHAT_SINH_VIEN': {
            const mangSinhVienCapNhat = [...state.mangSinhVien];
            // Tìm người dùng cần cập nhật
            let index = mangSinhVienCapNhat.findIndex
                (sinhVien => sinhVien.maSV === action.sinhVienCapNhat.maSV);
            if (index !== -1) {
                mangSinhVienCapNhat[index] = action.sinhVienCapNhat;
                state.mangSinhVien = mangSinhVienCapNhat;
            }else{
                alert('Không tìm thấy sinh viên để cập nhật');
            }

            return { ...state }
        }



        default: return state;
    }
}