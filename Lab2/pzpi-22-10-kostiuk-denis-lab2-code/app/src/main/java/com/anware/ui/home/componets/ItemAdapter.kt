package com.anware.ui.home.componets

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.anware.data.api.map.Item

class ItemAdapter: RecyclerView.Adapter<ItemAdapter.ItemViewHolder>()  {

    class ItemViewHolder(val item: ItemView) : RecyclerView.ViewHolder(item)

    private var items: List<Item> = emptyList()

    fun setData(data: List<Item>){
        items = data
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val postView = ItemView(parent.context)

        postView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )

        return ItemViewHolder(postView)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val post = items[position]
        holder.item.setData(post)
    }

}