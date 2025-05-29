package com.anware.ui.home.componets

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.anware.data.network.api.map.Gate

class GateAdapter: RecyclerView.Adapter<GateAdapter.GateViewHolder>()  {

    class GateViewHolder(val item: GateView) : RecyclerView.ViewHolder(item)

    private var items: List<Gate> = emptyList()

    private var listener: ((id: Int) -> Unit)? = null

    fun setData(data: List<Gate>){
        items = data
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GateViewHolder {
        val postView = GateView(parent.context)

        postView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )

        return GateViewHolder(postView)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: GateViewHolder, position: Int) {
        val gate = items[position]
        holder.item.setData(gate)

        holder.item.setOnClickListener {
            listener?.invoke(gate.id)
        }
    }

    fun setOnGateClickListener(listener: (id: Int) -> Unit) {
        this.listener = listener
    }
}