import Rayconnect from 'rayconnect-client';

let rayconnect = new Rayconnect({
    scopes: "@jaypy/whois",
    appID: "jaypy",
    space: "main",
    type: "client",
}, undefined, true);

rayconnect.OnConnect(async () => {
    console.log('[Rayconnect] connected!');

    let result = await rayconnect.Guest();

    await rayconnect.Auth(result.data.token)

    rayconnect.onAuth(() => {
        console.log("[Rayconnect] Authed!");

        whois()
    })
})


function whois(domain = 'google.com') {
    console.log(`[Whois] looking for: ${domain}`);
    rayconnect.execQuery({
        scope: '@jaypy/whois',
        address: 'whois',
        uniqueID: 'jaypy',
        TokenID: '*',
        info: {
            method: 'GET',
            data: domain
        }
    })

    rayconnect.Query({
        scope: '@jaypy/whois',
        address: 'whois',
        method: 'GET'
    }, data => console.log(data.data));
}