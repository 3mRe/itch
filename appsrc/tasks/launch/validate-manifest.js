
// TODO: refactor to use some shape matching library,
// maybe React propTypes are reusable? maybe not.

import {each} from 'underline'

const MANIFEST_REQUIRED_FIELDS = [
  'actions'
]

const MANIFEST_VALID_FIELDS = [
  'actions' // list of action `[[actions]]` blocks
]

const ACTION_REQUIRED_FIELDS = [
  'name',
  'path'
]

const ACTION_VALID_FIELDS = [
  'name', // human-readable or standard name
  'path', // file path (relative to manifest), URL, etc.
  'icon', // icon name (see static/fonts/icomoon/demo.html, don't include `icon-` prefix)
  'args', // command-line arguments
  'sandbox', // sandbox opt-in
  'scope' // requested API scope
]

export default function validateManifest (manifest, log, opts) {
  for (const field of Object.keys(manifest)) {
    if (MANIFEST_VALID_FIELDS.indexOf(field) === -1) {
      log(opts, `in manifest, unknown field '${field}' found`)
    }
  }

  for (const requiredField of MANIFEST_REQUIRED_FIELDS) {
    if (typeof manifest[requiredField] === 'undefined') {
      throw new Error(`in manifest, required field '${requiredField}' is missing`)
    }
  }

  manifest.actions::each((action, i) => {
    const denomination = action.name || `#${i}`

    for (const field of Object.keys(action)) {
      if (ACTION_VALID_FIELDS.indexOf(field) === -1) {
        log(opts, `in manifest action ${denomination}, unknown field '${field}' found`)
      }
    }

    for (const requiredField of ACTION_REQUIRED_FIELDS) {
      if (typeof action[requiredField] === 'undefined') {
        throw new Error(`in manifest action ${denomination}, required field '${requiredField}' is missing`)
      }
    }
  })
}
