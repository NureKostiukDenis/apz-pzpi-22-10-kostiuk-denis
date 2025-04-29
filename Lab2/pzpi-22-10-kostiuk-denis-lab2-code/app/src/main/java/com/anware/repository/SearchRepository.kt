package com.anware.repository

import com.anware.data.api.search.SearchItem
import com.anware.data.api.search.SearchService
import com.anware.data.local.UserLocalDataDAO

class SearchRepository(
    private val searchService: SearchService,
    private val userLocalDataDAO: UserLocalDataDAO
) {

    suspend fun search(itemTitle: String): List<SearchItem>{

        return try {
            val result = searchService.search(
                apiKey = userLocalDataDAO.getApiKey()!!,
                authorization = BearerToken( userLocalDataDAO.getUserToken()!!),
                sortQuery = itemTitle
            )

            result
        }catch (e: Exception){
            emptyList()
        }
    }

}