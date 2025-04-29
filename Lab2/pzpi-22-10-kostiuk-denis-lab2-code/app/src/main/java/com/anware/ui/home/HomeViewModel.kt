package com.anware.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.api.map.WarehouseSection
import com.anware.repository.MapRepository
import kotlinx.coroutines.launch

data class FragmentState(
    val selectedSection: WarehouseSection? = null,
    val detailMode: SectionDetailMode = SectionDetailMode.ITEMS
)

enum class SectionDetailMode {
    ITEMS, GATES
}

class HomeViewModel(
    val mapRepository: MapRepository
): ViewModel() {


    private val _state = MutableLiveData<FragmentState>(FragmentState())
    val state: LiveData<FragmentState> = _state

    private val _mapData = MutableLiveData<List<WarehouseSection>>()
    val mapData: LiveData<List<WarehouseSection>> = _mapData

    fun selectSection(section: WarehouseSection?){
        val currentState = _state.value ?: FragmentState()
        _state.value = currentState.copy(
            selectedSection = section,
            detailMode = SectionDetailMode.ITEMS
        )
    }

    fun setDetailMode(mode: SectionDetailMode) {
        val currentState = _state.value
        if (currentState?.selectedSection != null && currentState.detailMode != mode) {
            _state.value = currentState.copy(detailMode = mode)
        }
    }

    fun updateMapData(){
        viewModelScope.launch {
            _mapData.value = mapRepository.getMap()
        }
    }
}