let BASE_URL = 'http://localhost:3000';

if (process.env.REACT_APP_ENV === 'development') {
    BASE_URL = 'http://localhost:3000';
}

if (process.env.REACT_APP_ENV === 'production') {
    BASE_URL = 'https://sales-management-zm.herokuapp.com';
}

export { BASE_URL }