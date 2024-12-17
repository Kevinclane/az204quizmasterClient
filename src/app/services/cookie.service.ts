import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CookieService {

    public getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    public setCookie(cname: string, cvalue: string, expdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    public deleteCookie(cname: string) {
        document.cookie = cname + '=; Max-Age=-99999999;';
    }

}