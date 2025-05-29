package com.anware.data.network.api.auth

import com.anware.repository.BearerToken
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query

interface UserServices {

    @POST("${baseUrl}/log-in")
    suspend fun logIn(
        @Body body: UserRequest
    ):  Response<AuthResponse>

    @GET("${baseUrl}/info")
    suspend fun info(
        @Header("Authorization") authorization: String,
    ): Response<UserInfo>

    @POST("${baseUrl}/refresh")
    suspend fun refresh(
        @Header("Authorization") authorization: BearerToken,
        @Query("refreshToken") token: String
    ): Response<RefreshResponse>

    @GET("warehouse/api-key")
    suspend fun getApiKey(
        @Header("Authorization") authorization: String, 
    ): String

    @POST("${baseUrl}/token-verify")
    suspend fun verifyToken(
        @Header("Authorization") authorization: String,
    ): Response<Unit>

    companion object {
        private const val baseUrl = "user"
    }
}
