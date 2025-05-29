package com.anware.data.network.http

import com.anware.data.local.UserLocalDataDAO
import com.anware.data.local.UserLocalDataDAOImpl
import com.anware.data.network.api.auth.AuthResponse
import com.anware.data.network.api.auth.UserRequest
import com.anware.data.network.api.auth.UserServices
import com.anware.repository.BearerToken
import com.anware.repository.UserRepository
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response

class RefreshTokenInterceptor(
    private val userServices: UserServices,
    private val userLocalDataDAO: UserLocalDataDAO
) : Interceptor {

    @Synchronized
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        val response = chain.proceed(originalRequest)

//        if (response.code() == 401) {
//            response.close()
//
//            val refreshToken = userLocalDataDAO.getRefreshToken()
//            val userToken = userLocalDataDAO.getUserToken()
//
//            if(refreshToken != null && userToken != null){
//
//                val result = runBlocking {
//                    userServices.refresh(
//                        authorization = BearerToken(userToken),
//                        token = refreshToken
//                    )
//                }
//
//                if (result.isSuccessful) {
//                    val newToken = result.body() ?: return response
//
//                    userLocalDataDAO.setUserToken(newToken.token)
//                    userLocalDataDAO.setRefreshToken(newToken.refreshToken)
//
//                    val newRequest = originalRequest.newBuilder()
//                        .header("Authorization", BearerToken(newToken.token).toString())
//                        .build()
//
//                    return chain.proceed(newRequest)
//                }
//            }
//        }

        if (response.code() == 401) {
            response.close()

            val userEmail = userLocalDataDAO.getUserEmail()
            val userPassword = userLocalDataDAO.getUserPassword()

            if(userEmail != null && userPassword != null){

                val result = runBlocking {
                    userServices.logIn(
                        body = UserRequest(
                            email = userEmail,
                            password = userPassword
                        )
                    )
                }

                if (result.isSuccessful) {
                    val newToken = result.body() ?: return response

                    userLocalDataDAO.setUserToken(newToken.token)
                    userLocalDataDAO.setRefreshToken(newToken.refreshToken)

                    val newRequest = originalRequest.newBuilder()
                        .header("Authorization", BearerToken(newToken.token).toString())
                        .build()

                    return chain.proceed(newRequest)
                }
            }
        }


        return response
    }
}
