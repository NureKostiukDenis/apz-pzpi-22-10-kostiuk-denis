package com.anware.repository

import com.anware.data.api.auth.AuthResponse
import com.anware.data.api.auth.UserRequest
import com.anware.data.api.auth.UserServices
import com.anware.data.local.UserLocalDataDAO

class UserRepository (
    private val userService: UserServices,
    private val userLocalDataDAO: UserLocalDataDAO
) {
    suspend fun login(email: String, password: String): Result<AuthResponse>{
        return try {
            val result = userService.logIn(UserRequest(
                email,
                password
            ))

            userLocalDataDAO.setUserToken(result.token)

            val apiKey = getApiKey(result.token)

            if (apiKey.isSuccess){
                userLocalDataDAO.setApiKey(apiKey.getOrNull()!!)
            }else{
                Result.failure<Exception>(Exception("User don`t attached to warehouse"))
            }
            Result.success(result)
        }catch (e: Exception){
            Result.failure(e)
        }
    }

    suspend fun isTokenValid(): Result<Int>{
        try {
            val userToken = userLocalDataDAO.getUserToken() ?: throw Exception("Saved token does not exist.")
            val code = userService.verifyToken(bearerToken(userToken)).code()

            if (code == 200){
                val apiKey = getApiKey(userToken)

                if (apiKey.isSuccess){
                    userLocalDataDAO.setApiKey(apiKey.getOrNull()!!)
                    return Result.success(code)
                }else{
                    return Result.failure(Exception("User don`t attached to warehouse"))
                }
            }else{
                return Result.failure(Exception("Token isn`t valid."))
            }
        }catch (e: Exception){
            return Result.failure(e)
        }
    }

    suspend fun getApiKey(
        userToken: String
    ): Result<String>{
        return try {
            Result.success(userService.getApiKey(bearerToken(userToken)))
        }catch (e: Exception){
            Result.failure(e)
        }
    }

    private fun bearerToken(rawToken: String): String{
        return "Bearer $rawToken"
    }
}