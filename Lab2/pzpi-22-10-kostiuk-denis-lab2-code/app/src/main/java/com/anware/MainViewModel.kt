package com.anware

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.network.api.auth.UserInfo
import com.anware.data.local.UserLocalDataDAO
import com.anware.repository.UserRepository
import kotlinx.coroutines.launch

class MainViewModel(
    private val userLocalDataDAO: UserLocalDataDAO,
    private val userRepository: UserRepository,
): ViewModel() {

    private val _update: MutableLiveData<Boolean> = MutableLiveData(false)
    val update: LiveData<Boolean> = _update

    private val _userInfo: MutableLiveData<UserInfo?> = MutableLiveData()
    val userInfo: LiveData<UserInfo?> = _userInfo

    fun userInfo(){
        viewModelScope.launch {
            val info = userRepository.getInfo()
            if(info.isSuccess){
                _userInfo.value = info.getOrNull()
            }else{
                _userInfo.value = null
            }
        }
    }

    fun updateStart(){
        _update.postValue(true)
    }

    fun updateFinish(){
        _update.postValue(false)
    }

}