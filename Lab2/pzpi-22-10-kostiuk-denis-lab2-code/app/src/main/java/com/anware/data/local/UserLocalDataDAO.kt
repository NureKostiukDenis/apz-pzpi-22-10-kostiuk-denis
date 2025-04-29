package com.anware.data.local

interface UserLocalDataDAO {

    fun getUserToken(): String?
    fun setUserToken(token: String)

    fun getApiKey(): String?
    fun setApiKey(apiKey: String)

}