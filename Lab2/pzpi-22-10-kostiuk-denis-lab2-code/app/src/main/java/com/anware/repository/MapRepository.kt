package com.anware.repository

import android.util.Log
import com.anware.data.network.api.map.MapServices
import com.anware.data.network.api.map.WarehouseSection
import com.anware.data.local.UserLocalDataDAO

class MapRepository(
    private val mapServices: MapServices,
    private val userLocalDataDAO: UserLocalDataDAO
) {

    suspend fun getMap(): List<WarehouseSection>{
        var data: List<WarehouseSection> = emptyList()

        try {

            val result = mapServices.getWarehouseMap(
                authorization = BearerToken(userLocalDataDAO.getUserToken()!!),
                apiKey = userLocalDataDAO.getApiKey()!!
            )

            if(result.isSuccessful){
                data = result.body() ?: emptyList()
            }else{
                throw Exception("Invalid!")
            }

        }catch (e: Exception){
            Log.d("MapRepository", "getMap: $e")
        }

        return data
    }
}

