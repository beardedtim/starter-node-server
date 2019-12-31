const fs = require('fs')

const requireDir = (directoryPath, modules = {}) => {
  const dirPaths = fs.readdirSync(directoryPath, { withFileTypes: true })

  for (let path of dirPaths) {
    if (path.isFile() && path.name !== 'index.js') {
      modules[path.name.slice(0, -3)] = require(`${directoryPath}/${path.name}`)
    } else if (path.isDirectory()) {
      modules[directoryPath] = requireDir(
        `${directoryPath}/${path.name}`,
        modules
      )
    }
  }

  return modules
}

module.exports = requireDir
