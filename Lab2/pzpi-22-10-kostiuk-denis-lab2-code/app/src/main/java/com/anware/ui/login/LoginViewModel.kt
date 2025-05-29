package com.anware.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.local.UserLocalDataDAO
import com.anware.repository.UserRepository
import kotlinx.coroutines.launch


class LoginViewModel(
    private val loginRepository: UserRepository,
    private val userLocalDataDAO: UserLocalDataDAO
) : ViewModel() {

    private val _loginForm = MutableLiveData<LoginFormState>()
    val loginFormState: LiveData<LoginFormState> = _loginForm

    private val _loginResult = MutableLiveData<LoginResult>()
    val loginResult: LiveData<LoginResult> = _loginResult

    fun login(username: String, password: String) {
        viewModelScope.launch {

            val result = loginRepository.login(username.trim(), password.trim())

            if (result.isSuccess){
                result.getOrNull()?.let {
                    _loginResult.value =
                        LoginResult(success = true, userToken = it.token, refreshToken = it.refreshToken)
                }
            }else if (result.isFailure){
                result.exceptionOrNull()?.let {
                    _loginResult.value = (LoginResult(success = false))
                }
            }
        }
    }

    suspend fun autoLogin(): Boolean {
        val email = userLocalDataDAO.getUserEmail()
        val password = userLocalDataDAO.getUserPassword()

        return if (!email.isNullOrBlank() && !password.isNullOrBlank()) {
            val result = loginRepository.login(email, password)
            result.isSuccess
        } else {
            false
        }
    }

    fun verifyToken(){
        viewModelScope.launch {
            val result = loginRepository.isTokenValid()
            if (result.isSuccess){
                _loginResult.value =
                    LoginResult(success = true)
            }else if (result.isFailure){
                result.exceptionOrNull()?.let {
                    _loginResult.value = (LoginResult(success = false))
                }
            }
        }
    }

}