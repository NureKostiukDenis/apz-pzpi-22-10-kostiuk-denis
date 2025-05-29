package com.anware.repository

import android.os.Build
import androidx.annotation.RequiresApi
import com.anware.data.network.apiv2.item.ItemResponse
import com.anware.data.network.apiv2.item.ItemService
import com.anware.data.local.UserLocalDataDAO
import com.anware.data.network.apiv2.item.formatDisplayDateTime

class ItemRepository(
    private val itemService: ItemService,
    private val userLocalDataDAO: UserLocalDataDAO
) {
    @RequiresApi(Build.VERSION_CODES.O)
    suspend fun getOne(id: Int): ItemResponse?{
        try {

            val result = itemService.getOne(
                authorization = BearerToken(userLocalDataDAO.getUserToken()!!),
                apiKey = userLocalDataDAO.getApiKey()!!,
                id = id
            )

            if(result.isSuccessful){
                val res = result.body()

                return res?.copy(
                    createdAt = formatDisplayDateTime(res.createdAt),
                    updatedAt = formatDisplayDateTime(res.updatedAt)
                )

            }else{
                throw Exception("Invalid!")
            }

        }catch (e: Exception){
            return null
        }
    }
}