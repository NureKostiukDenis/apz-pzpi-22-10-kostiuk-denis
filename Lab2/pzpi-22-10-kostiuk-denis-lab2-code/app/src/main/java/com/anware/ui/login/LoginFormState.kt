package com.anware.ui.login

data class LoginFormState(
    val email: String? = null,
    val password: String? = null,
    val error: String? = null,
    val emailError: Int? = null,
    val passwordError: Int? = null,
    val inProgress: Boolean = false

)
