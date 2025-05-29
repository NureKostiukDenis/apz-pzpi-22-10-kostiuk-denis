package com.anware.ui.search

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.network.api.search.SearchItem
import com.anware.data.network.apiv2.item.ItemResponse
import com.anware.di.viewModelsModule
import com.anware.repository.ItemRepository
import com.anware.repository.SearchRepository
import kotlinx.coroutines.launch

class SearchViewModel(
    private val searchRepository: SearchRepository,
    private val itemRepository: ItemRepository
): ViewModel() {

    private val _query = MutableLiveData<String>()
    val query: LiveData<String> = _query

    private val _detail = MutableLiveData<ItemResponse?>()
    val detail: LiveData<ItemResponse?> = _detail

    private val _searchData = MutableLiveData<List<SearchItem>>()
    val searchData : LiveData<List<SearchItem>> = _searchData

    fun search(){
        viewModelScope.launch{
            val data = searchRepository.search(query.value!!)
            _searchData.postValue(data)
        }
    }

    fun setQuery(query: String){
        _query.value = query
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun itemDetails(itemId: Int){
        viewModelScope.launch {
            _detail.value = itemRepository.getOne(itemId)
        }
    }

    fun clearItemDetails(){
        _detail.value = null
    }
}