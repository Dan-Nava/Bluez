function constructRequest(body, method) {
    return {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        mode: 'cors',
    };
}

module.exports = constructRequest