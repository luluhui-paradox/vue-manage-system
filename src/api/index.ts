import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: '/userInfo.json',
        method: 'get'
    });
};

export const getWorkHistory = () => {
    return request({
        url: '/workHistoryList.json',
        method: 'get'
    });
};
