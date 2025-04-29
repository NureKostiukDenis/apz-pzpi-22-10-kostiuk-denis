package com.anware.ui.search

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.anware.data.api.search.SearchItem
import com.anware.repository.SearchRepository
import kotlinx.coroutines.launch

class SearchViewModel(
    private val searchRepository: SearchRepository
): ViewModel() {

    private val _query = MutableLiveData<String>()
    val query: LiveData<String> = _query

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

}