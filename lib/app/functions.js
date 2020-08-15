import Whois from 'whois-json';

async function whois(domain) {
    if (!domain || typeof domain != 'string') return { status: false, message: 'Invalid domain address!' }
    try {
        let result = await Whois(domain);
        result = 'error' in result;
        if (result) return { status: true, exists: false, message: 'Not registered!' };
        else return { status: true, exists: true, message: 'Registered!' }
    } catch (error) {
        console.log('Error', error);
        return { status: false, message: 'Error happent!' }
    }
}

export default { whois };