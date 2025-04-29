package com.anware.ui.login

data class LoginResult(
    val userToken: String? = null,
    val refreshToken: String? = null,
    val success: Boolean = false,
)