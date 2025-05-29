package com.anware.data.network.http

import com.anware.data.local.UserLocalDataDAO
import com.anware.data.network.api.auth.UserServices
import com.anware.repository.UserRepository
import okhttp3.OkHttpClient

class HttpClient(
    private val userServices: UserServices,
    private val localDataDAO: UserLocalDataDAO
) {
    fun getClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(RefreshTokenInterceptor(userServices, localDataDAO))
            .build()
    }
}