const fetch = require('node-fetch')
const algoliasearch = require('algoliasearch')
const algolia = algoliasearch('0U9JWU3SGR', '031a7c65a749677bcd8c18569f155ac7')
const recycleIndex = algolia.initIndex('staging_recycle')
const zipcodeIndex = algolia.initIndex('staging_zipcode')
const _ = require('lodash')

class Algolia {
	constructor() {
	}

	getIndexByName(name) {
		switch (name) {
			case "zipcodeIndex":
				return zipcodeIndex
			default:
				return recycleIndex
		}
	}

	async search(text, indexName) {
		return new Promise((resolve, reject) => {
			return this.getIndexByName(indexName).search({ query: text }, (error, content) => {
				if (error) {
					return resolve(null)
				} else {
					return resolve(content)
				}
			})
		});
	}

	async searchFacet({query, indexName, facetFilters, filters}) {
		return new Promise((resolve, reject) => {
			let searchQuery = JSON.stringify({
				query,
				facetFilters,
				filters
			})

			console.log("searchQuery ", searchQuery)
			return this.getIndexByName(indexName).search(JSON.parse(searchQuery), (error, content) => {
				if (error) {
					console.log("My Error ", error)
					return resolve(null)
				} else {
					return resolve(content)
				}
			})
		});
	}

	async isRecyclable(text, facetFilters) {
		let searchParams = {
			query: text,
			indexName: "recycleIndex",
			facetFilters,
		}
		let content = await this.searchFacet(searchParams)
		if (_.isEmpty(content || content.hits) || content.hits.length <= 0) {
			return ({
				recycle: null,
				count: content.hits.length,
				hits: content.hits
			})
		}
		else if (content.hits.length === 1) {
			return ({
				recycle: content.hits[0].recycle === true ? true : false,
				count: content.hits.length,
				hits: content.hits
			})
		}
		else if (content.hits.length > 1) {
			// if(content.hits[0].item.toLowerCase() === text.toLowerCase()) {
			// 	return ({
			// 		recycle: content.hits[0].recycle === true ? true : false,
			// 		count: content.hits.length,
			// 		hits: content.hits
			// 	})
			// }

			return ({
				recycle: null,
				count: content.hits.length,
				hits: content.hits
			})
		}
	}

	async isValidZipcode(zipcode) {
		console.log('zipcode', zipcode)
		let content = await this.search(zipcode, "zipcodeIndex")
		console.log('content', content)
		if (_.isEmpty(content || content.hits) || content.hits.length <= 0)
			return null;
		else {
			return content.hits[0].zipcode === zipcode ? true : false
		}
	}
}

module.exports = Algolia