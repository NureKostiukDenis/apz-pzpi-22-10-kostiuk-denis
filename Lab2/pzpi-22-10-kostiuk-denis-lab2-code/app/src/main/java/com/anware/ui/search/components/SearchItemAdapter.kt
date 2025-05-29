package com.anware.ui.search.components

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.anware.data.network.api.search.SearchItem


class SearchItemAdapter: RecyclerView.Adapter<SearchItemAdapter.SearchItemViewHolder>() {

    class SearchItemViewHolder(val searchItemView: SearchItemView): RecyclerView.ViewHolder(searchItemView)

    private var items: List<SearchItem> = emptyList()


    private var listener: ((id: Int) -> Unit)? = null

    fun setData(data: List<SearchItem>){
        items = data
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SearchItemViewHolder {
        val searchItemView = SearchItemView(parent.context)

        searchItemView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )

        return SearchItemViewHolder(searchItemView)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    fun setOnItemClickListener(listener: (id: Int) -> Unit) {
        this.listener = listener
    }


    override fun onBindViewHolder(holder: SearchItemViewHolder, position: Int) {
        val searchItem = items[position]
        holder.searchItemView.setData(searchItem)

        holder.searchItemView.setOnClickListener {
            listener?.invoke(searchItem.id!!)
        }
    }


}