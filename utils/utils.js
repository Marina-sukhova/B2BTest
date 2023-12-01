module.exports = {
     getCurrentDateTime() {
        const date = new Date();
    
        const year = date.getFullYear().toString().slice(2); // Get the last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    
        const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
    
        return `${month}/${day}/${year} - ${hours}:${minutes}`;
    }
}
