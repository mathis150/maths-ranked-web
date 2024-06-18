import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard = () => {
    let auth = inject(AuthService)
    const router = inject(Router);

    auth.login().subscribe((response : any) => {
        if(response.status != 200) {
            router.navigateByUrl('/login')
            return false
        }
        else
        {
            return true
        }
    })
}