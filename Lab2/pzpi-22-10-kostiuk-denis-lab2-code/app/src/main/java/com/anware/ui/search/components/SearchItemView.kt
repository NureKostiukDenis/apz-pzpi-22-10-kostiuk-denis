package com.anware.ui.search.components

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.anware.data.network.api.search.SearchItem
import com.anware.databinding.SearchItemViewBinding

class SearchItemView: RelativeLayout {

    private var _binding: SearchItemViewBinding? = null
    private val binding get() = _binding!!

    private lateinit var itemData: SearchItem

    constructor(context: Context) : super(context) {
        init(null, 0)
    }

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init(attrs, 0)
    }

    constructor(context: Context, attrs: AttributeSet, defStyle: Int) : super(
        context,
        attrs,
        defStyle
    ) {
        init(attrs, defStyle)
    }

    private fun init(attrs: AttributeSet?, defStyle: Int) {
        _binding = SearchItemViewBinding.inflate(LayoutInflater.from(context), this, true)
    }

    fun setData(itemData: SearchItem){
        this.itemData = itemData

        binding.rfidTag.text = "RFID: ${itemData.rfidTag}"
        binding.productName.text = itemData.name
        binding.sectionName.text = itemData.sectionName
    }
}