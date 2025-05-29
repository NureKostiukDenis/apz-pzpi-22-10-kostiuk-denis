package com.anware.ui.home

import android.app.AlertDialog
import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.anware.MainViewModel
import com.anware.R
import com.anware.data.network.api.map.WarehouseSection
import com.anware.data.network.apiv2.gate.GateResponse
import com.anware.data.network.apiv2.item.ItemResponse
import com.anware.databinding.FragmentHomeBinding
import com.anware.ui.home.componets.GateAdapter
import com.anware.ui.home.componets.ItemAdapter
import org.koin.androidx.viewmodel.ext.android.activityViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val homeViewModel: HomeViewModel by viewModel()
    private val mainViewModel: MainViewModel by activityViewModel()

    private lateinit var itemsAdapter: ItemAdapter
    private lateinit var gatesAdapter: GateAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupUI()
        setupObservers()
        setupListeners()

        homeViewModel.updateMapData()
    }


    private fun setupUI() {
        itemsAdapter = ItemAdapter()
        gatesAdapter = GateAdapter()

        binding.itemsRecyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = itemsAdapter
        }

        binding.gatesRecyclerView.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = gatesAdapter
        }

        binding.detailsViewFlipper.displayedChild = 0
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun setupListeners() {
        binding.mapView.setOnSectionClickListener(object : WarehouseMapView.OnSectionClickListener {
            override fun onSectionClicked(section: WarehouseSection) {
                homeViewModel.selectSection(section)
            }
        })

        binding.toggleGroupDetailMode.addOnButtonCheckedListener { group, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.buttonShowItems -> homeViewModel.setDetailMode(SectionDetailMode.ITEMS)
                    R.id.buttonShowGates -> homeViewModel.setDetailMode(SectionDetailMode.GATES)
                }
            }
        }

        itemsAdapter.setOnItemClickListener {
            homeViewModel.getItemDetails(it)
        }

        gatesAdapter.setOnGateClickListener {
            homeViewModel.getGateDetails(it)
        }
    }

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
                homeViewModel.clearItemDetails()
            }
            .show()
    }

    private fun showGateDetails(gate: GateResponse) {
        val message = buildString {
            appendLine("ID: ${gate.id}")
            appendLine("Code: ${gate.code}")
            appendLine("Type: ${gate.type ?: "Unknown"}")
            appendLine("Section ID: ${gate.sectionId ?: "N/A"}")
        }

        AlertDialog.Builder(requireContext())
            .setTitle("Gate Details")
            .setMessage(message)
            .setPositiveButton("Close") { dialog, _ ->
                dialog.dismiss()
                homeViewModel.clearGateDetails()
            }
            .show()
    }

    private fun setupObservers() {
        mainViewModel.update.observe(viewLifecycleOwner){
            if (it){
                homeViewModel.updateMapData()
                mainViewModel.updateFinish()
            }
        }

        homeViewModel.mapData.observe(viewLifecycleOwner){ data ->
            binding.mapView.setWarehouseData(data)
        }

        homeViewModel.state.observe(viewLifecycleOwner) { state ->
            binding.mapView.setVisuallySelectedSection(state.selectedSection?.sectionName)

            if (state.gateDetails != null){
                showGateDetails(state.gateDetails)
            }else if (state.itemDetails != null){
                showItemDetails(state.itemDetails)
            }

            if (state.selectedSection != null) {
                binding.selectedSection.text = "Section: ${state.selectedSection.sectionName}"

                val checkedButtonId = if (state.detailMode == SectionDetailMode.ITEMS) R.id.buttonShowItems else R.id.buttonShowGates
                if (binding.toggleGroupDetailMode.checkedButtonId != checkedButtonId) {
                    binding.toggleGroupDetailMode.check(checkedButtonId)
                }

                val displayedChildIndex = if (state.detailMode == SectionDetailMode.ITEMS) 0 else 1
                if (binding.detailsViewFlipper.displayedChild != displayedChildIndex) {
                    binding.detailsViewFlipper.displayedChild = displayedChildIndex
                }

                itemsAdapter.setData(state.selectedSection.items)
                gatesAdapter.setData(state.selectedSection.gatesList)

            } else {
                itemsAdapter.setData(emptyList())
                gatesAdapter.setData(emptyList())
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}