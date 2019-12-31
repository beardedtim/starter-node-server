const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readDir = promisify(fs.readdir)

const possibleAPIMethods = new Set([
  'post',
  'put',
  'get',
  'patch',
  'delete',
  'head',
  'options'
])

const parseAPIFolders = async (rootDir, context = {}) => {
  const files = await readDir(rootDir, { withFileTypes: true })

  for (const f of files) {
    // This is a file
    if (f.isFile()) {
      // Let's see if it's a method we know how to parse
      const possibleMethod = path.basename(path.resolve(rootDir, f.name), '.js')

      // If it is a method we know how to parse,
      // let's add it to context!
      if (possibleAPIMethods.has(possibleMethod)) {
        const methodURLPath = rootDir.replace(__dirname, '')

        context[methodURLPath] = context[methodURLPath]
          ? {
              ...context[methodURLPath],
              [possibleMethod]: require(path.resolve(rootDir, f.name))
            }
          : {
              [possibleMethod]: require(path.resolve(rootDir, f.name))
            }
      }
    } else if (f.isDirectory()) {
      await parseAPIFolders(path.resolve(rootDir, f.name), context)
    }
  }

  return context
}

module.exports = parseAPIFolders
