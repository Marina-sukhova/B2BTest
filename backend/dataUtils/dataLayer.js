const DATA_LAYER_URL = process.env.DATA_LAYER_URL;
const IP_SEGMENTS_URL_PARAMETER = "ip_address";
const CALLER_ID_PARAMETER = "caller_id";
const CALLER_ID_PARAMETER_VALUE = "magnolia";


async function getDataLayer(fastlyClientIp) {

    const authHeaders = new Headers();
    authHeaders.set(process.env.DATA_LAYER_AUTHKEY, process.env.DATA_LAYER_AUTHVALUE);

    const requestOptions = {
        method: 'GET',
        headers: authHeaders,
    };

    let url = `${DATA_LAYER_URL}?${CALLER_ID_PARAMETER}=${CALLER_ID_PARAMETER_VALUE}`;

    if (fastlyClientIp) {
        url += `&${IP_SEGMENTS_URL_PARAMETER}=${fastlyClientIp}`;
    } else { console.log("No Ip Addresses has been added") };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(
                `Failed API Request: ${response.statusText} -- HTTP Response Code: ${response.status}`
            );
        }

        const jsonKiddModel = await response.json();
        return jsonKiddModel;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}


module.exports = { getDataLayer };
