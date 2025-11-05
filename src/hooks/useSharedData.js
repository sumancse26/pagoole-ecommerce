let sharedData = null;

export function setSharedData(data) {
    sharedData = { search: data.isSearch, searchProd: data.list };
}

export function getSharedData() {
    return sharedData;
}
