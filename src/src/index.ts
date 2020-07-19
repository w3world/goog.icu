function q() {
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const params = new URLSearchParams(window.location.search);
  let a = params.get('a');
}

interface SearchEngine {
  name: string        // Google
  priority: number    // 9 for google, 1 for baidu
  url: string         // https://www.google.com/ , .co.uk, com.hk, think about different subdomain
  defaultPath: string // `/search?q=${q}&ie=UTF-8`
  penalty?: (s:string) => number  // when the rule is matched, add penalty on top of the priority
  // params?: Map<string, string> // 
}

interface Rules {
  name: string
  domain: string
  path: string
}

let engines:SearchEngine[] = [
  {
    name: 'Google',
    priority: 9,
    url: 'https://www.google.com',
    defaultPath: `/search?q=${q}&ie=UTF-8`
  },
  {
    name: 'Bing Intl',
    priority: 5,
    penalty: q => isAllEnglish(q) ? 1: 0,
    url: 'https://www.bing.com',
    defaultPath: `/search?q=${q}&ensearch=1`
  },
  {
    name: 'Bing CN',
    priority: 5,
    penalty: q => isChineseIncluded(q) ? 1: 0,
    url: 'https://www.bing.com',
    defaultPath: `/search?q=${q}`
  },
  {
    name: 'Yandex',
    priority: 3,
    penalty: q => isRussianIncluded(q) ? 3: 0,
    url: 'https://yandex.com',
    defaultPath: `/search/?text=${q}`
  },
]

function isAllEnglish(q:string) {
  return true;
}

function isChineseIncluded(q:string) {
  const regex = /\p{Unified_Ideograph}/u;
  return regex.test(q);
}

function isRussianIncluded(q:string) {
  const regex = /\p{Script=Cyrillic}/u;
  return regex.test(q)
}

function detect({name, domain, path}:Rules) {
  loadConfig(name)
  if(await sniffResource(path)){
    return true;
  }else{
    return false;
  }
}

async function sniffResource(path, timeout = 200) {
  // create a http request and see 200 statuts without timeout
  
}