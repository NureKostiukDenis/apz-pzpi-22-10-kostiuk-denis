package com.anware.data.local

import android.content.Context
import android.content.SharedPreferences
import com.anware.data.network.api.auth.UserInfo

class UserLocalDataDAOImpl(context: Context): UserLocalDataDAO {

    companion object {
        private const val PREFS_NAME = "user_data_prefs"
        private const val KEY_USER_TOKEN = "user_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
        private const val KEY_API_KEY = "api_key"
        private const val DEFAULT_STRING_VALUE = ""

        private const val USER_NAME = "user_name"
        private const val USER_EMAIL = "user_email"

        private const val USER_EMAIL2 = "user_email2"
        private const val USER_PASSWORD = "user_password"

    }

    private val sharedPreferences: SharedPreferences =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    override fun getUserToken(): String? {
        return sharedPreferences.getString(KEY_USER_TOKEN, DEFAULT_STRING_VALUE)
    }

    override fun setUserToken(token: String) {
        sharedPreferences.edit().putString(KEY_USER_TOKEN, token).apply()
    }

    override fun getRefreshToken(): String? {
        return sharedPreferences.getString(KEY_REFRESH_TOKEN, DEFAULT_STRING_VALUE)
    }

    override fun setRefreshToken(token: String) {
        sharedPreferences.edit().putString(KEY_REFRESH_TOKEN, token).apply()
    }

    override fun getApiKey(): String? {
        return sharedPreferences.getString(KEY_API_KEY, DEFAULT_STRING_VALUE)
    }

    override fun setApiKey(apiKey: String) {
        sharedPreferences.edit().putString(KEY_API_KEY, apiKey).apply()
    }

    override fun setUserInfo(userInfo: UserInfo) {
        sharedPreferences.edit().putString(USER_NAME, userInfo.name).apply()
        sharedPreferences.edit().putString(USER_EMAIL, userInfo.email).apply()
    }

    override fun getUserInfo(): UserInfo {
         return UserInfo(
            sharedPreferences.getString(USER_NAME, "N/A")!!,
            sharedPreferences.getString(USER_EMAIL, "N/A")!!
        )
    }

    override fun setUserPassword(password: String) {
        sharedPreferences.edit().putString(USER_PASSWORD, password).apply()
    }

    override fun getUserPassword(): String? {
        return sharedPreferences.getString(USER_NAME, "N/A")
    }

    override fun setUserEmail(email: String) {
        sharedPreferences.edit().putString(USER_EMAIL2, email).apply()
    }

    override fun getUserEmail(): String?  {
        return sharedPreferences.getString(USER_EMAIL2, "N/A")
    }


}