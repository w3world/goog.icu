export function tik(): number {return +new Date()}
export function uid(): string {return GICU + tik().toString(36)}

interface URLParams {
  refreshToken?:string
}
// http://www.a.com/a.js => http://www.a.com/a.js?GICUToken=1234567890
// http://www.a.com/a.js?id=1 => http://www.a.com/a.js?id=1&GICUToken=1234567890
export function mixParams(src: string, {refreshToken}:URLParams): string {
  let result = src
  const param = `${GICU}RefreshToken=${refreshToken}`
  const sections = src.split("/")
  if (sections[sections.length - 1].indexOf("?") != -1) {
    result += `&`
  } else {
    result += `?`
  }
  result += param
  return result 
}

// https://goog.icu/?q=123 => only match this case
// https://goog.icu/#/setting?q=123
export function q() {
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const params = new window.URLSearchParams(window.location.search);
  return params.get('q') || params.get('query');
}

export function isAllEnglish(q:string) {
  return true;
}

export function isChineseIncluded(q:string) {
  const regex = /\p{Unified_Ideograph}/u;
  return regex.test(q);
}

