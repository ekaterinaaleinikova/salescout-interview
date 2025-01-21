type RequestsResult = {
    data: any,
    status: number
}

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    const promises = urls.map(url =>
        fetch(url)
            .then(response => response.json().then(data => ({ data, status: response.status })))
            .catch(error => ({ data: error, status: 500 }))
    );
    return Promise.all(promises);
}

module.exports = { fetchAll };
