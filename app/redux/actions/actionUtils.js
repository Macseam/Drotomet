'use strict';

export function requestData(type) {
    return { type: type + '_REQUEST' };
}

export function receiveData(type, json, path) {
    return {
        type: type + '_SUCCESS',
        data: json,
        path: path,
    };
}

export function receiveError(type, json, path) {
    return {
        type: type + '_FAILURE',
        data: json,
        path: path,
    };
}
