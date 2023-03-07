export default function urlParams(url, searchParam) {
    const oldUrl = url.toString();
    if (oldUrl === "") {
        return `?${searchParam}=true`
    }
    else {
        return `?${oldUrl}&${searchParam}=true`;
    }
}