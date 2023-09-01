import axios from "axios";
import Notify from "../helpers/notify";
import useApi from "./api";
import { ref } from "vue";
const { checkResponse, getResource } = useApi();

export default function useToken() {
    const isAdmin = ref<Boolean>(false);
    async function setToken(token: any) {
        sessionStorage.setItem('token', JSON.stringify(token));
    }

    function getAccessToken() {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token')!);
        }
        return '';
    }

    async function clearToken() {
        sessionStorage.clear();
    }

    async function decodeToken() {
        try {
            const response = await getResource('/auth/me');
            await checkResponse(response);
            checkRole(response.data.type);
            return await response.data;
        } catch (error: any) {
            Notify.error(error.message);
        }
    }

    async function checkRole(role: string) {
        if (role === 'Administrator') {
            isAdmin.value = true;
            return;
        }
        isAdmin.value = false;
    }

    async function validateToken() {
        try {
            const payload = JSON.parse(window.atob((getAccessToken())!.split(".")[1]));
            const expired = payload.exp;
            const now = Date.now() / 1000;
            if (now > expired) {
                await refresh();
            }
        } catch (error: any) {
            Notify.error(error.message);
        }
    }

    async function refresh() {
        try {
            const { data } = await axios.post(import.meta.env.VITE_API_SHRIMP + '/auth/refresh', {}, {
                headers: {
                    "Authorization": "Bearer " + getAccessToken(),
                }
            });
            await setToken(data.data.token_access);
            await decodeToken();
            return;
        } catch (error: any) {
            clearToken();
            Notify.error(error.message);
        }
    }


    return {
        setToken, clearToken, decodeToken, getAccessToken, validateToken, isAdmin, refresh
    };

}