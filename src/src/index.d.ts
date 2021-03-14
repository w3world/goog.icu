/**
 * Client Global
 */
interface MyWindow { 
  navigator: any
  document: MyDocument
  location: MyLocation
  fetch: Function
  URLSearchParams: any
  requestAnimationFrame: any
  addEventListener: Function
  removeEventListener: Function
  
}
interface MyDocument {
  addEventListener: any
  hidden: boolean
  querySelector: any
}
interface MyLocation {
  search: string
  href: string
  assign: Function
}
declare var window: MyWindow
declare var document: MyDocument


/**
 * GICU Global
 */
declare const GICU = "GoogIcu"

type Timestamp = number


