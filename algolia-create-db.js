const algoliasearch = require('algoliasearch')
const algolia = algoliasearch('0U9JWU3SGR', '031a7c65a749677bcd8c18569f155ac7')
// const stagingdb = require('./algolia-db-staging.json')
// const index = algolia.initIndex('staging_recycle')
// index.addObjects(stagingdb)
const stagingdb = require('./zipcode-staging.json')
const index = algolia.initIndex('staging_zipcode')
index.addObjects(stagingdb)