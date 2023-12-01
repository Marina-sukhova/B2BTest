// randomeIPList.js
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomIpAddressInRange(min, max) {
    const parts = [
        getRandomInt(min[0], max[0]),
        getRandomInt(min[1], max[1]),
        getRandomInt(min[2], max[2]),
        getRandomInt(min[3], max[3])
    ];

    return parts.join('.');
}

function generateRandomIpAddressesInRange(min, max, count) {
    const ipAddresses = [];

    while (ipAddresses.length < count) {
        const ipAddress = generateRandomIpAddressInRange(min, max);
        ipAddresses.push(ipAddress);
    }

    return ipAddresses;
}

function getRandomIPAddresses(ipRanges) {
    const listOfLists = [];
    for (const range of ipRanges) {
        const minIpParts = range[0];
        const maxIpParts = range[1];

        const randomIpAddresses = generateRandomIpAddressesInRange(minIpParts, maxIpParts, 2);
        listOfLists.push(randomIpAddresses);
        listOfLists.push([minIpParts.join('.'), maxIpParts.join('.')]);
    }
    const maxLength = Math.max(...listOfLists.map(innerArray => innerArray.length));

    return listOfLists.flatMap(innerArray =>
        innerArray.slice(0, maxLength).map(ipAddress => ({
            ipAddress, fastlyClientIp: ipAddress,
        }))
    );
}
module.exports = {
    getRandomIPAddresses,
};


