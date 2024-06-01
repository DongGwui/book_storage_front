import axios, {AxiosRequestConfig} from "axios";
import {router} from "next/client";

const config: AxiosRequestConfig = {baseURL: "http://localhost:4000/" , withCredentials: true}

const axiosClient = axios.create(config); //응답 메시지 다른것들 -> 인스턴스 여러개 -> 관리 용이?(유지보수가 편한가)
//구분 예) 다른곳 api요청
//baseurl을 여러개로 해서

// axiosClient.interceptors.request.use(
//     async (config) => {
//         //ex) 헤더에 토큰 넣어서 보내주기
//
//         //로그인 되어 있는지 확인하고, 필요한 경우 isAuth 로 확인
//         // const {isAuth} = useAppSelector((state) => state.persistedReducer.auth.value);
//
//         console.log("request interceptor run");
//         return config;
//     }
// );

axiosClient.interceptors.response.use(
    async (response) => {
        console.log("response interceptor run");
       return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // 에러가 발생한 요청이 토큰 관련 에러이고, 아직 토큰 재발급 요청을 보내지 않았을 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 플래그를 설정

            try {
                const refreshTokenResponse = await axiosClient.post("/auth/refreshtoken", config);
                return axiosClient(originalRequest);
            } catch (refreshTokenError) {
                // refresh token으로 access token을 갱신하는 데 실패한 경우
                console.error('Error refreshing access token:', refreshTokenError);
                // 로그인 화면으로 리다이렉트 등 에러 처리 로직 추가
                await router.push(`/auth/login`);
            }
        }
        return Promise.reject(error);
    });
            // if(error.config && error.response){ //조건 구체화 -> 엑세스 토큰 만료 에러 인지만 체크하기
        //     console.log("response interceptor refresh token start");
        //     try {
        //         const result = await axios.get("/auth/refreshtoken", config);
        //         if(result.status === 200){
        //             console.log("response interceptor retry config");
        //             console.log(result.data);
        //             return axiosClient(error.config.url);
        //         }
        //     }catch (error){
        //         console.log(error);
        //     }
        // }

export default axiosClient;