import { KeycloakService } from "keycloak-angular";

export function initializer(keycloak:KeycloakService):()=>Promise<any>{
 return ():Promise<any>=>{
return new Promise<void>(async(resolve,reject)=>{
  try{
    await keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'main',
          clientId: 'main'
        },
          initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: [
              '/assets',
              '/clients/public'],

      })
  resolve();
    }

catch(error){
  reject(error);
}
 },)}
}
