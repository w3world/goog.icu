import {isExtension, Extension} from "../loader"

test('should return JS/JSON given the external link', () => {
  expect(isExtension("https://google.com/api.js", Extension.JS)).toBe(true)
  expect(isExtension("https://google.com/result.json", Extension.JSON)).toBe(true)
})

test('should return IMGs given the external link', () => {
  expect(isExtension("https://google.com/logo.png", Extension.IMG)).toBe(true)
  expect(isExtension("https://google.com/logo.gif", Extension.IMG)).toBe(true)
  expect(isExtension("https://google.com/logo.jpg", Extension.IMG)).toBe(true)
  expect(isExtension("https://google.com/logo.jpeg", Extension.IMG)).toBe(true)
})

test('should return OTHER given the external link', () => {
  expect(isExtension("https://google.com/something.txt", Extension.OTHER)).toBe(true)
})

