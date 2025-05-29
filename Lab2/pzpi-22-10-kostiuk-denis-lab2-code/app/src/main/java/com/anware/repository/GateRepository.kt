package com.anware.repository

import com.anware.data.network.apiv2.gate.GateResponse
import com.anware.data.network.apiv2.gate.GateService
import com.anware.data.local.UserLocalDataDAO

class GateRepository(
    private val gateService: GateService,
    private val userLocalDataDAO: UserLocalDataDAO
) {

    suspend fun getOne(id: Int): GateResponse?{
         try {
            val result = gateService.getOne(
                authorization = BearerToken(userLocalDataDAO.getUserToken()!!),
                apiKey = userLocalDataDAO.getApiKey()!!,
                id = id
            )

            if(result.isSuccessful){
                return result.body()

            }else{
                throw Exception("Invalid!")
            }

        }catch (e: Exception){
            return null
        }
    }

}