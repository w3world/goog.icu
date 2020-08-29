import { isAllEnglish, isChineseIncluded } from './Util/util'

export interface SearchEngine {
  id: string
  name: string        // Google
  priority: number    // 9 for google, 1 for baidu
  family?: string,    // One family may have multiple members, named after the primary member's `id`
  url: string         // https://www.google.com/ , .co.uk, com.hk, think about different subdomain
  searchPath: (s:string) => string  // `/search?q=${q}&ie=UTF-8`
  bonus?: (s:string) => number      // when the rule is matched, bonus is added on top of the priority
  // params?: Map<string, string>   // 
  resources: string[] // list of resources to sniff
}

export const defaultEngines:SearchEngine[] = [
  {
    id: 'googleCom',
    name: 'Google',
    priority: 9,
    url: 'https://www.google.com',
    searchPath: q => `/search?q=${q}&ie=UTF-8`,
    resources: [
      "https://apis.google.com/js/api.js",
      "https://maps.googleapis.com/maps/api/js",
      "https://www.gstatic.com/ui/v1/activityindicator/loading_24.gif"
    ],
  },
  {
    id: 'bingCn',
    family: 'bingCn',
    name: 'Bing CN',
    priority: 6,
    bonus: q => isChineseIncluded(q) ? 1: 0,
    url: 'https://cn.bing.com/',
    searchPath: q => `/search?q=${q}`,
    resources: [
      "https://www.bing.com/sa/simg/hpc27.png"
    ],
  },
  {
    id: 'bingCnIntl',
    family: 'bingCn',
    name: 'Bing CN International',
    priority: 5,
    bonus: q => isAllEnglish(q) ? 2: 0,
    url: 'https://cn.bing.com/',
    searchPath: q => `/search?q=${q}&ensearch=1`,
    resources: [
      "https://www.bing.com/sa/simg/hpc27.png"
    ],
  },
  {
    id: 'baiduCom',
    name: 'Baidu',
    priority: 1,
    url: 'https://www.baidu.com',
    searchPath: q => `/s?wd=${q}`,
    resources: [
      "https://sm.bdimg.com/static/wiseindex/img/screen_icon_new.png",
      "https://www.baidu.com/img/flexible/logo/plus_logo_web.png"
    ],
  },
  {
    id: 'test',
    name: 'Test',
    priority: 5,
    url: 'https://localhost',
    searchPath: q => `/search?q=${q}`,
    resources: [
      "https://localhost/test.png"
    ],
  },
]

// Returns the primay engines
export function warm(searchEngines:SearchEngine[]){
  return searchEngines
    // Returns the primary engine in each family
    .filter(eng => eng.family ? eng.family && eng.family === eng.id : true)
    // High to low
    .sort(eng => eng.priority)
}