import { combineReducers, createStore } from "redux"
import { baiTapQuanLyThongTinSinhVienReducer } from "./baiTapQuanLyThongTinSinhVienReducer";

const rootReducer = combineReducers({
    baiTapQuanLyThongTinSinhVienReducer


})


export const store = createStore(
    rootReducer,
    


);

