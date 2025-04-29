package com.anware.data.local

import android.content.Context
import android.content.SharedPreferences

class UserLocalDataDAOImpl(context: Context): UserLocalDataDAO {

    companion object {
        private const val PREFS_NAME = "user_data_prefs"
        private const val KEY_USER_TOKEN = "user_token"
        private const val KEY_API_KEY = "api_key"
        private const val DEFAULT_STRING_VALUE = ""
    }

    private val sharedPreferences: SharedPreferences =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    override fun getUserToken(): String? {
        return sharedPreferences.getString(KEY_USER_TOKEN, DEFAULT_STRING_VALUE)
    }

    override fun setUserToken(token: String) {
        sharedPreferences.edit().putString(KEY_USER_TOKEN, token).apply()
    }

    override fun getApiKey(): String? {
        return sharedPreferences.getString(KEY_API_KEY, DEFAULT_STRING_VALUE)
    }

    override fun setApiKey(apiKey: String) {
        sharedPreferences.edit().putString(KEY_API_KEY, apiKey).apply()
    }
}