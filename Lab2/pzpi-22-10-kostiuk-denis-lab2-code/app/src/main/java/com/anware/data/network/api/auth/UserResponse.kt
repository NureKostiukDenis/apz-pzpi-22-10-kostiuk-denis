package com.anware.data.network.api.auth

import com.google.gson.annotations.SerializedName

data class AuthResponse(
    @SerializedName("idToken") val token: String,
    @SerializedName("refreshToken") val refreshToken: String
)

data class RefreshResponse(
    @SerializedName("id_token") val token: String,
    @SerializedName("refresh_token") val refreshToken: String
)

data class RefreshTokenResponse(
    val idToken: String
)

data class UserInfo(
    val name: String,
    val email: String,
)
