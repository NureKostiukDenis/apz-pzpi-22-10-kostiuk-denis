package com.anware.ui.home.componets

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.anware.data.api.map.Gate
import com.anware.data.api.map.Item
import com.anware.databinding.GateViewBinding
import com.anware.databinding.ProductViewBinding

class GateView: RelativeLayout {

    private var _binding: GateViewBinding? = null
    private val binding get() = _binding!!

    private lateinit var gateData: Gate

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
        _binding = GateViewBinding.inflate(LayoutInflater.from(context), this, true)
    }

    fun setData(gate: Gate){
        binding.gateCode.text = gate.code
        binding.gateType.text = "Type: ${gate.type}"
        gateData = gate
    }

}