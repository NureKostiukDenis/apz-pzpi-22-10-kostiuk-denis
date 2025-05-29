package com.anware.data.local

import com.anware.data.network.api.auth.UserInfo

interface UserLocalDataDAO {

    fun getUserToken(): String?
    fun setUserToken(token: String)

    fun getRefreshToken(): String?
    fun setRefreshToken(token: String)

    fun getApiKey(): String?
    fun setApiKey(apiKey: String)

    fun setUserInfo(userInfo: UserInfo)
    fun getUserInfo(): UserInfo

    fun setUserPassword(password: String)
    fun getUserPassword() : String?

    fun setUserEmail(email: String)
    fun getUserEmail() : String?
}