package com.anware.ui.home

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.network.api.map.WarehouseSection
import com.anware.data.network.apiv2.gate.GateResponse
import com.anware.data.network.apiv2.item.ItemResponse
import com.anware.repository.GateRepository
import com.anware.repository.ItemRepository
import com.anware.repository.MapRepository
import kotlinx.coroutines.launch

data class FragmentState(
    val selectedSection: WarehouseSection? = null,
    val detailMode: SectionDetailMode = SectionDetailMode.ITEMS,
    val itemDetails: ItemResponse? = null,
    val gateDetails: GateResponse? = null,
)

enum class SectionDetailMode {
    ITEMS, GATES
}

class HomeViewModel(
    val mapRepository: MapRepository,
    val itemRepository: ItemRepository,
    val gateRepository: GateRepository
): ViewModel() {


    private val _state = MutableLiveData<FragmentState>(FragmentState())
    val state: LiveData<FragmentState> = _state

    private val _mapData = MutableLiveData<List<WarehouseSection>>()
    val mapData: LiveData<List<WarehouseSection>> = _mapData

    fun selectSection(section: WarehouseSection?){
        val currentState = _state.value ?: FragmentState()
        _state.value = currentState.copy(
            selectedSection = section,
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

    @RequiresApi(Build.VERSION_CODES.O)
    fun getItemDetails(id: Int){
        viewModelScope.launch {
            _state.value = _state.value?.copy(
                itemDetails = itemRepository.getOne(id)
            )
        }
    }

    fun getGateDetails(id: Int){
        viewModelScope.launch {
            _state.value = _state.value?.copy(
                gateDetails = gateRepository.getOne(id)
            )
        }
    }

    fun clearGateDetails(){
        _state.value = _state.value?.copy(
            gateDetails = null
        )
    }

    fun clearItemDetails(){
        _state.value = _state.value?.copy(
            itemDetails = null
        )
    }

}