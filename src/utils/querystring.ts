
function getQueryStringParam(key:string, defaultValue?:string):string {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key) || defaultValue || "";
}

function setQueryStringParam(key:string, value:string):string {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    return queryParams.toString();
}

function removeQueryStringParam(key:string):string {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(key);
  return queryParams.toString();
}

export {
    getQueryStringParam,
    setQueryStringParam,
    removeQueryStringParam,   
}