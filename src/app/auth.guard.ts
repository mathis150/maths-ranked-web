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

    return true; // Add this line to return a value in all code paths
}