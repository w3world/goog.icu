import { isAllEnglish, isChineseIncluded } from '../utils/util'

export interface SearchEngine {
  name: string                          // Google
  priority: number                      // 9 for google, 1 for baidu
  family?: string                       // One family may have multiple members
  familyPrimary?: true                  // primary
  url: string                           // https://www.google.com/ , .co.uk, com.hk, think about different subdomain
  resources: string[]                   // list of resources to sniff
  searchPath: (s: string) => string     // `/search?q=${q}&ie=UTF-8`
  bonus?: (s: string) => number         // when the rule is matched, bonus is added on top of the priority
}

// Default Engines
export const defaultSearchEngines: Record<string, SearchEngine> = {
  'com.example': {
    name: 'Example Search',
    priority: 5,
    url: 'https://example.com',
    searchPath: q => `/search?q=${q}`,
    resources: [
      "https://example.com/logo.png",
      "https://example-static.com/main.js",
    ],
  },
  'com.google': {
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
  'com.bing.intl': {
    name: 'Bing',
    family: 'com.bing.cn',
    familyPrimary: true,
    priority: 6,
    bonus: q => isAllEnglish(q) ? 2 : 0,
    url: 'https://cn.bing.com/',
    searchPath: q => `/search?q=${q}&ensearch=1`,
    resources: [
      "https://www.bing.com/sa/simg/hpc27.png"
    ],
  },
  'com.bing.cn': {
    name: 'Bing CN',
    family: 'com.bing.cn',
    priority: 5,
    bonus: q => isChineseIncluded(q) ? 2 : 0,
    url: 'https://cn.bing.com/',
    searchPath: q => `/search?q=${q}`,
    resources: [
      "https://www.bing.com/sa/simg/hpc27.png"
    ],
  },
  'com.baidu': {
    name: 'Baidu',
    priority: 1,
    url: 'https://www.baidu.com',
    searchPath: q => `/s?wd=${q}`,
    resources: [
      "https://sm.bdimg.com/static/wiseindex/img/screen_icon_new.png",
      "https://www.baidu.com/img/flexible/logo/plus_logo_web.png",
    ],
  },
  'com.sogou': {
    name: 'Sogou',
    priority: 4,
    url: 'https://www.sogou.com',
    searchPath: q => `/web?query=${q}`,
    resources: [
      "https://www.sogou.com/web/img/logo115_50.png",
    ],
  },
}