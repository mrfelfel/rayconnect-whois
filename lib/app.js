import "dotenv/config";
import Rayconnect from "rayconnect-client";

///
import functions from './app/functions';
///


const rayconnect = new Rayconnect({
    scopes: '@jaypy/whois',
    appID: 'jaypy',
    space: 'main',
    type: 'micros'
}, undefined, true)


rayconnect.OnConnect(async () => {
    console.log("[Rayconnect] connected!");

    await rayconnect.Auth(process.env.TOKEN);

    rayconnect.changePermissions({
        mode: 'add',
        uid: 'guest',
        scope: '@jaypy/whois',
        method: 'GET',
        address: 'whois'
    })

    rayconnect.Query({
        scope: '@jaypy/whois',
        address: 'whois',
        method: 'GET'
    }, async data => {
        let result = await functions.whois(data.data);
        console.log("[Whois] done!");
        rayconnect.execQuery({
            scope: '@jaypy/whois',
            address: 'whois',
            uniqueID: data.sender,
            TokenID: '*',
            info: {
                method: 'GET',
                data: result
            }
        })
    })
})