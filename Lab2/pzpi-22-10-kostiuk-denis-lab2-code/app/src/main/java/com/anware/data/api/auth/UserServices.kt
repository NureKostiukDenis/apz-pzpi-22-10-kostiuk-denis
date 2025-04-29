package com.anware.data.api.auth

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface UserServices {

    @POST("${baseUrl}/log-in")
    suspend fun logIn(
        @Body body: UserRequest
    ): AuthResponse

    @POST("${baseUrl}/refresh")
    suspend fun refresh(
        @Body body: String
    ): RefreshTokenResponse

    @GET("warehouse/api-key")
    suspend fun getApiKey(
        @Header("Authorization") authorization: String, // Повинен бути у форматі "Bearer <ваш_токен>"
    ): String

    @POST("${baseUrl}/token-verify")
    suspend fun verifyToken(
        @Header("Authorization") authorization: String,
    ): Response<Unit>

    companion object {
        private const val baseUrl = "user"
    }
}
