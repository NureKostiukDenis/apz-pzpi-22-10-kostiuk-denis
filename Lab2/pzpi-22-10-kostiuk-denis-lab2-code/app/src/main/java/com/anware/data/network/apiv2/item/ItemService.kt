package com.anware.data.network.apiv2.item

import com.anware.repository.BearerToken
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface ItemService {

    @GET("item/{id}")
    suspend fun getOne(
        @Header("Authorization") authorization: BearerToken,
        @Header("ApiKey") apiKey: String,
        @Path("id") id: Int
    ): Response<ItemResponse>

}