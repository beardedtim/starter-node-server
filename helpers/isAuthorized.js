const handleDBAuthorization = (subject, action) => false
const handleUserAuthorization = (subject, action, resource_id) => false

const resources = {
  users: handleUserAuthorization,
  db: handleDBAuthorization
}

module.exports = async (claim, req) => {
  const { subject, action, object } = claim
  const [resource, resource_id] = object.split('::')

  // If we know how to handle this relationship,
  if (resource.toLowerCase() in resources) {
    return resources[resource.toLowerCase()](subject, action, resource_id)
  }

  // If we don't know how to handle it, assume they cannot
  // make that request
  return false
}
