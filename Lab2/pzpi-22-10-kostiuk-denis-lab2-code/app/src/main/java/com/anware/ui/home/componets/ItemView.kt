package com.anware.ui.home.componets

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.anware.data.api.map.Item
import com.anware.databinding.ProductViewBinding

class ItemView: RelativeLayout {

    private var _binding: ProductViewBinding? = null
    private val binding get() = _binding!!

    private lateinit var itemData: Item

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
        _binding = ProductViewBinding.inflate(LayoutInflater.from(context), this, true)
    }

    fun setData(item: Item){
        binding.productName.text = item.name
        binding.rfidTag.text = "RFID: ${item.rfidTag}"
        itemData = item
    }

}