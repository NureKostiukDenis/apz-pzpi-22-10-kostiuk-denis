package com.anware.ui.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.anware.databinding.FragmentSearchBinding
import com.anware.ui.search.components.SearchItemAdapter
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class SearchFragment : Fragment() {

    private var _binding: FragmentSearchBinding? = null
    private val binding get() = _binding!!

    private val searchViewModel: SearchViewModel by activityViewModel()
    private lateinit var searchListAdapter: SearchItemAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentSearchBinding.inflate(inflater, container, false)
        return _binding?.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setUpUI()
        setUpListeners()
        setUpObservers()
    }

    private fun setUpListeners(){
        binding.searchView.setOnQueryTextListener(object: SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                query?.let { searchViewModel.setQuery(it) }
                binding.searchView.clearFocus()
                searchViewModel.search()
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                searchViewModel.setQuery(newText.orEmpty())
                return true
            }
        })

    }

    private fun setUpObservers(){
        searchViewModel.searchData.observe(viewLifecycleOwner){
            searchListAdapter.setData(it)
        }
    }

    private fun setUpUI(){
        searchListAdapter = SearchItemAdapter()

        binding.itemList.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = searchListAdapter
        }
    }

}