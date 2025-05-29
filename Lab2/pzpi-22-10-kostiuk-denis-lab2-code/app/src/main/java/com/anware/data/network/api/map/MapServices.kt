package com.anware.data.network.api.map

import com.anware.repository.BearerToken
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Header

interface MapServices {

    @GET("warehouse/map/")
    suspend fun getWarehouseMap(
        @Header("Authorization") authorization: BearerToken,
        @Header("ApiKey") apiKey: String
    ): Response<List<WarehouseSection>>

}