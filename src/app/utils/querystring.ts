"use client";

import { ReadonlyURLSearchParams } from "next/navigation";


function setQueryStringParam(searchParams:ReadonlyURLSearchParams, key:string, value:string):string {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(key, value);
    return queryParams.toString();
}

function removeQueryStringParam(key:string):string {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(key);
  return queryParams.toString();
}

export {
    setQueryStringParam,
    removeQueryStringParam,   
}