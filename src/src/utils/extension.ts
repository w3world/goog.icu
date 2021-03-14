export enum Extension {
  JS,
  JSON,
  IMG,
  OTHER
}

export function isExtension(src: string, ext: Extension) {
  return ext === extensionFromPath(src)

  function extensionFromPath(_src: string) {
    if (_src.endsWith('.js')) { return Extension.JS }
    if (_src.endsWith('.json')) { return Extension.JSON }

    const imageExtension = ['.png', '.jpg', '.jpeg', 'gif', 'webp']
    if (imageExtension.find(img => _src.endsWith(img)) !== undefined) {
      return Extension.IMG
    }

    return Extension.OTHER
  }
}
