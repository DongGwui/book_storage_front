import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {baseURL: "http://localhost:4000/" , withCredentials: true}

const axiosClient = axios.create(config); //응답 메시지 다른것들 -> 인스턴스 여러개 -> 관리 용이?(유지보수가 편한가)
//구분 예) 다른곳 api요청
//baseurl을 여러개로 해서

axiosClient.interceptors.request.use(
    async (config) => {
        //ex) 헤더에 토큰 넣어서 보내주기

        //로그인 되어 있는지 확인하고, 필요한 경우 isAuth 로 확인
        // const {isAuth} = useAppSelector((state) => state.persistedReducer.auth.value);

        console.log("request interceptor run");
        return config;
    }
);

axiosClient.interceptors.response.use(
    async (response) => {
        console.log("response interceptor run");
       return response;
    },
    async (error) => {
        console.log(error.config);
        console.log(error.response);
        if(error.config && error.response){ //조건 구체화
            console.log("response interceptor refresh token start");
            try {
                const result = await axios.get("/auth/refreshtoken", config);
                if(result.status === 200){
                    console.log("response interceptor retry config");
                    console.log(result.data);
                    return axiosClient(error.config.url);
                }
            }catch (error){
                console.log(error);
            }
        }
    }
);

export default axiosClient;