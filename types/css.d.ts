declare module '*.m.css' {
  const cssModuleExport: {
    [className: string]: string
  }
  export = cssModuleExport
}
