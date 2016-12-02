import {getOtpNumber, login, httpValidate} from '../../apis/login.api.js'
export default {
    state: {
        otpStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        loginStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        recDetail: {} // 病历详情
    },
    mutations: {
        setOtpStatus (state, data) {
            state.otpStatus = data
        },
        setLoginStatus (state, data) {
            state.loginStatus = data
        }
    },
    actions: {
        getOtp ({commit}, data) {
            commit('setOtpStatus', getOtpNumber(data))
        },
        loginIN ({commit}, data) {
            commit('setLoginStatus', login(data))
        },
        validatePhoneNumberAndNeedPic ({commit}, data) {
            httpValidate(data)
        }
    }
}
