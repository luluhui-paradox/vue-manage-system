import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: '/userInfo.json',
        method: 'get'
    });
};
