package com.anware.data.api.search

import com.anware.repository.BearerToken
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

data class SearchItem(
    val id: Int?,
    val rfidTag: String,
    val name: String?,
    val sectionName: String
)

interface SearchService {

    @GET("${baseUrl}/search")
    suspend fun search(
        @Header("Authorization") authorization: BearerToken,
        @Header("ApiKey") apiKey: String,
        @Query("query") sortQuery: String
    ): List<SearchItem>

    companion object{
        const val baseUrl: String = "item"
    }
}