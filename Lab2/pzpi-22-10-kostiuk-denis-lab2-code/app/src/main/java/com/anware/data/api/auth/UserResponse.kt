package com.anware.data.api.auth

import com.google.gson.annotations.SerializedName

data class AuthResponse(
    @SerializedName("idToken") val token: String,
    @SerializedName("refreshToken") val refreshToken: String
)

data class RefreshTokenResponse(
    val idToken: String
)

