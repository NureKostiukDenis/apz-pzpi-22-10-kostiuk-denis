package com.anware.repository

import android.util.Log
import com.anware.data.network.api.auth.AuthResponse
import com.anware.data.network.api.auth.UserInfo
import com.anware.data.network.api.auth.UserRequest
import com.anware.data.network.api.auth.UserServices
import com.anware.data.local.UserLocalDataDAO

class UserRepository (
    private val userService: UserServices,
    private val userLocalDataDAO: UserLocalDataDAO
) {

    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return try {
            val result = userService.logIn(UserRequest(email, password))

            if (result.isSuccessful) {
                val authResponse = result.body()

                if (authResponse != null) {
                    userLocalDataDAO.setUserToken(authResponse.token)
                    userLocalDataDAO.setRefreshToken(authResponse.refreshToken)
                    userLocalDataDAO.setUserPassword(password)
                    userLocalDataDAO.setUserEmail(email)

                    val apiKey = getApiKey(authResponse.token)
                    if (apiKey.isSuccess) {
                        userLocalDataDAO.setApiKey(apiKey.getOrNull()!!)
                    } else {
                        return Result.failure(Exception("User is not attached to warehouse"))
                    }

                    Result.success(authResponse)
                } else {
                    Result.failure(Exception("Response body is null"))
                }
            } else {
                Result.failure(Exception("Request was not successful: ${result.code()}"))
            }
        } catch (e: Exception) {
            Log.d("Login", "login failed: ${e.message}")
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

    suspend fun getInfo(): Result<UserInfo>{
        return try {
            val userToken = userLocalDataDAO.getUserToken() ?: throw Exception("Saved token does not exist.")
            val result = userService.info(bearerToken(userToken))

            if (result.isSuccessful){
                Result.failure<Exception>(Exception("User don`t attached to warehouse"))
            }

            userLocalDataDAO.setUserInfo(result.body()!!)

            return Result.success(result.body()!!)
        }catch (e: Exception){
            Log.d("Info", "info: ${e}")
            Result.failure(e)
        }
    }

    private fun bearerToken(rawToken: String): String{
        return "Bearer $rawToken"
    }
}