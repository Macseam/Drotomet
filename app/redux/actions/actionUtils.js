'use strict';

export function requestData(type) {
    return { type: type };
}

export function receiveData(type, json, path) {
    return {
        type: type,
        data: json,
        path: path,
    };
}

export function receiveError(type, json, path) {
    return {
        type: type,
        data: json,
        path: path,
    };
}
