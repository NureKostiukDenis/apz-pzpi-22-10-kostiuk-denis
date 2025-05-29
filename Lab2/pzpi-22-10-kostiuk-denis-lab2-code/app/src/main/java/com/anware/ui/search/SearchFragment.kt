package com.anware.ui.search

import android.app.AlertDialog
import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.anware.data.network.apiv2.item.ItemResponse
import com.anware.databinding.FragmentSearchBinding
import com.anware.ui.search.components.SearchItemAdapter
import org.koin.androidx.viewmodel.ext.android.activityViewModel
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.Locale

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

    @RequiresApi(Build.VERSION_CODES.O)
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

    @RequiresApi(Build.VERSION_CODES.O)
    private fun setUpObservers(){
        searchViewModel.searchData.observe(viewLifecycleOwner){
            searchListAdapter.setData(it)
        }

        searchViewModel.detail.observe(viewLifecycleOwner){
            if(it!=null){
                showItemDetails(it)
            }
        }
    }


    @RequiresApi(Build.VERSION_CODES.O)
    private fun showItemDetails(item: ItemResponse) {

        val message = buildString {
            appendLine("ID: ${item.id}")
            appendLine("Name: ${item.name ?: "Unknown"}")
            appendLine("RFID: ${item.rfidTag}")
            appendLine("Section: ${item.sectionName ?: "N/A"}")
            appendLine("Created: ${item.createdAt}")
        }

        AlertDialog.Builder(requireContext())
            .setTitle("Item Details")
            .setMessage(message)
            .setPositiveButton("Close") { dialog, _ ->
                dialog.dismiss()
                searchViewModel.clearItemDetails()
            }
            .show()
    }


    @RequiresApi(Build.VERSION_CODES.O)
    private fun setUpUI(){
        searchListAdapter = SearchItemAdapter()

        binding.itemList.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = searchListAdapter
        }

        searchListAdapter.setOnItemClickListener {
            searchViewModel.itemDetails(it)
        }
    }


}