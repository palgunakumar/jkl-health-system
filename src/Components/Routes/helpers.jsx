import { APPS } from "./routes";

export const getApp = () =>{
    const subdomain = getSubDomain(window.location.hostname);

    const mainApp = APPS.find((app) => app.main)

    if (!mainApp) throw new Error ("Must have a main  app");
    if(subdomain === "") return mainApp.app;


    const app = APPS.find(app => subdomain === app.subdomain)

    if(!app) return mainApp.app;
    return app.app;
}

const getSubDomain = (location) =>{

    const locationParts = location?.split('.');

    let sliceTil = -2;


    const isLocalhost = locationParts.slice(-1)[0] === 'localhost';
    if (isLocalhost) sliceTil = -1
        return locationParts.slice(0, sliceTil).join('')
}