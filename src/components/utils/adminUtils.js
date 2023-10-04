function fetchUsers(Token) {

    const url = 'http://localhost:8000/api/v1/users/';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Token ' + String(Token),
        }
    };
    const data = fetch(url, options)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            alert('Lo lamentamos, hubo un error al conectarse al servidor\nIntentelo de nuevo más tarde');
            console.log(error);
            return [];
        });

    return data;

}

function fetchActivities(Token) {

    const url = 'http://localhost:8000/api/v1/activities/';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Token ' + String(Token),
        }
    };
    const data = fetch(url, options)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            alert('Lo lamentamos, hubo un error al conectarse al servidor\nIntentelo de nuevo más tarde');
            console.log(error);
            return [];
        });

    return data;

}

export { fetchUsers, fetchActivities }